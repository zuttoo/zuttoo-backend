import { BadRequestException, Injectable } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { SelectSupplierDto } from './dto/select-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RmSku } from '../orders/entities/rmsku.entity';
import { ProductService } from 'src/product/product.service';

interface Inventory{
  sfg: {
    sfg_materialdescription: string;
    sfg_inventory: number;
    sfg_fgrequired: number;
    sfg_rmrequired: number;
    sfg_requiredQty:number;

  },
  rm: {
    rm_materialdescription: string;
    rm_inventory: number;
    rm_requiredQty:number;
  };
}

@Injectable()
export class SuppliersService {
  constructor(
    private productService: ProductService,
    @InjectRepository(Supplier) private supplierRepository:Repository<Supplier>,
    @InjectRepository(RmSku) private rmskuRepository: Repository<RmSku>,
  ){}

  async rankSuppliers(dto:SelectSupplierDto):Promise<{message:string;data:Inventory[]}>{

    const {productName, fgsku, quantity, uom, priority, expectedDeliveryDate}=dto;

    if(!productName || !fgsku || !quantity || !uom || !expectedDeliveryDate){
      throw new BadRequestException("Required fields are missing");
    }
    
    const {data}=await this.productService.getInventory(fgsku);

    const transformedResult:Inventory[]=data.map((item)=>(
      
      {
        sfg: {
          
          sfg_materialdescription: item.sfg.sfg_materialdescription,
          sfg_inventory: item.sfg.sfg_inventory,
          sfg_fgrequired: item.sfg.sfg_fgrequired,
          sfg_rmrequired: item.sfg.sfg_rmrequired,
          sfg_requiredQty:item.sfg.sfg_fgrequired*quantity
        },
        rm: {
          rm_materialdescription: item.rm.rm_materialdescription,
          rm_inventory: item.rm.rm_inventory,
          rm_requiredQty:item.sfg.sfg_rmrequired*item.sfg.sfg_fgrequired*quantity

        },
      }
    ))

    return{
      message:"Inventory Data Returned Successfully",
      data:transformedResult
    }






  }





}
