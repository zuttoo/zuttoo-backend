import { BadRequestException, Injectable } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { SelectSupplierDto } from './dto/select-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RmSku } from '../orders/entities/rmsku.entity';
import { ProductService } from 'src/product/product.service';

interface Inventory{
  fg:{
    fg_id:string;
    fg_materialNumber:string;
    fg_materialDescription:string;
    fg_inventory:number;
    fg_sfgRequired:number;
    fg_orderQty:number;

  },
  sfg: {
    sfg_materialDescription: string;
    sfg_inventory: number;
    sfg_fgRequired: number;
    sfg_rmRequired: number;
    sfg_requiredQty:number;

  },
  rm: {
    rm_materialDescription: string;
    rm_inventory: number;
    rm_requiredQty:number;
  };
}

interface Supplier{
  id:string;
  name:string;
  cost:number;
  timelineScore:number;
  qualityScore:number;
  costScore:number;
  reliabilityScore:number;
}

type RmSkuWithSuppliers = Inventory['rm'] & {
  suppliers: Supplier[];
};

interface InventoryWithSuppliers extends Omit<Inventory, 'rm'> {
  rm: RmSkuWithSuppliers;
}
const mockSuppliers:{[rmskuId:string]:Supplier[]}={
  "SKU_TSTL001_bf72e3d2-0401-4e75-9981-2f82d4a7074d":[
    { id: 's1', name: 'JSW Steel', cost: 100000, timelineScore: 0.9, qualityScore: 0.95, costScore: 0.8, reliabilityScore: 0 },
    { id: 's2', name: 'Chitradurga Steel Works', cost: 90000, timelineScore: 0.85, qualityScore: 0.8, costScore: 0.9, reliabilityScore: 0 },
    { id: 's3', name: 'GlobalMaterials', cost: 110000, timelineScore: 0.95, qualityScore: 0.9, costScore: 0.7, reliabilityScore: 0 },
    { id: 's4', name: 'Nippon Steel', cost: 86848, timelineScore: 0.88, qualityScore: 0.81, costScore: 0.76, reliabilityScore: 0 },
  ],
  "SKU_JSTL002_5340455d-a1c7-4396-9fab-458c47fbf21e":[
    { id: 's5', name: 'Acme Steel', cost: 80993, timelineScore: 0.8, qualityScore: 0.75, costScore: 0.95, reliabilityScore: 0 },
    { id: 's6', name: 'Nippon Steel', cost: 95303, timelineScore: 0.9, qualityScore: 0.9, costScore: 0.85, reliabilityScore: 0 },
    { id: 's7', name: 'Korea Steel', cost: 909393, timelineScore: 0.95, qualityScore: 0.75, costScore: 0.81, reliabilityScore: 0 },
  ],
  "SKU_CSTL003_f9671d97-026d-4d04-988b-ce2672b0a558":[
    { id: 's8', name: 'Acme Steel', cost: 802939, timelineScore: 0.8, qualityScore: 0.75, costScore: 0.95, reliabilityScore: 0 },
    { id: 's9', name: 'Nippon Steel', cost: 953902, timelineScore: 0.9, qualityScore: 0.9, costScore: 0.85, reliabilityScore: 0 },
    { id: 's10', name: 'Korea Steel', cost: 9039485, timelineScore: 0.95, qualityScore: 0.75, costScore: 0.81, reliabilityScore: 0 },
  ]
} 

// Calculate reliability score (you can adjust weights as needed)
Object.values(mockSuppliers).forEach(suppliers => {
  suppliers.forEach(supplier => {
    supplier.reliabilityScore = (
      0.4 * supplier.timelineScore +
      0.4 * supplier.qualityScore +
      0.2 * supplier.costScore
    ).toFixed(2) as unknown as number;
  });
});


@Injectable()
export class SuppliersService {
  constructor(
    private productService: ProductService,
    @InjectRepository(Supplier) private supplierRepository:Repository<Supplier>,
    @InjectRepository(RmSku) private rmskuRepository: Repository<RmSku>,
  ){}

  async rankSuppliers(dto:SelectSupplierDto):Promise<{message:string;data:InventoryWithSuppliers[]}>{

    const {productName, fgskuId, quantity, uom, priority, expectedDeliveryDate}=dto;

    if(!productName || !fgskuId || !quantity || !uom || !expectedDeliveryDate){
      throw new BadRequestException("Required fields are missing");
    }
    
    const {data}=await this.productService.getInventory(fgskuId);

    const transformedResult: InventoryWithSuppliers[]=data.map((item)=>{
      const rmMaterialDescription=item.rm.rm_materialDescription;
      const suppliers=mockSuppliers[rmMaterialDescription] || [];
      const rankedSuppliers=[...suppliers].sort((a,b)=>b.reliabilityScore-a.reliabilityScore);

      return{
        fg:{
          fg_id:item.fg.fg_id,
          fg_materialNumber:item.fg.fg_materialDescription,
          fg_materialDescription:item.fg.fg_materialDescription,
          fg_inventory:item.fg.fg_inventory,
          fg_sfgRequired:item.fg.fg_sfgRequired,
          fg_orderQty:quantity
      
        },
        sfg:{
          sfg_materialDescription:item.sfg.sfg_materialDescription,
          sfg_inventory:item.sfg.sfg_inventory,
          sfg_fgRequired:item.fg.fg_sfgRequired,
          sfg_rmRequired:item.sfg.sfg_rmRequired,
          sfg_requiredQty:item.fg.fg_sfgRequired*quantity,
        },
        rm:{
          rm_materialDescription: item.rm.rm_materialDescription,
          rm_inventory: item.rm.rm_inventory,
          rm_requiredQty:item.sfg.sfg_rmRequired*item.fg.fg_sfgRequired*quantity,
          suppliers:rankedSuppliers,
        },
      };

    });

    return {
      message:"Inventory Data with Ranked Suppliers Returned Successfully",
      data:transformedResult
    }
  }

}
