import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FgSku } from 'src/orders/entities/fgsku.entity';
import { SFGSku } from 'src/orders/entities/sfgsku.entity';
import { RmSku } from 'src/orders/entities/rmsku.entity';

interface TransformedInventoryData{
  fg:{
    fg_id:string;
    fg_materialNumber:string;
    fg_materialDescription:string;
    fg_inventory:number;
    fg_sfgRequired:number;

  },
  sfg: {
    sfg_materialDescription: string;
    sfg_inventory: number;
    sfg_rmRequired: number;
  },
  rm: {
    rm_materialDescription: string;
    rm_materialGrade:string;
    rm_inventory: number;

  };
}

@Injectable()
export class ProductService {
 constructor(
  @InjectRepository(Product) private readonly productRepository:Repository<Product>,
  @InjectRepository(FgSku) private readonly fgskuRepository: Repository<FgSku>,
  @InjectRepository(SFGSku) private readonly sfgskuRepository: Repository<SFGSku>,
  @InjectRepository(RmSku) private readonly rmskuRepository: Repository<RmSku>,
 ){}

 async getAllProducts(clientId: string, type: string): Promise<{ message: string, data: Product[], count:number }> {
  if (!clientId || !type) {
    throw new BadRequestException(" Client id or product type is invalid");
  }

  let result: Product[];
  let count:number
  switch (type) {
    case 'FG':
      const fgResult = await this.productRepository
        .createQueryBuilder('product')
        .select(['product.id', 'product.name', 'product.type'])
        .where('product.client = :clientId', { clientId })
        .andWhere('product.type = :type', { type })
        .getRawAndEntities();

        result=fgResult.entities;
        count=fgResult.raw.length;
        console.log(result);
      break;
    case 'SFG':
      const sfgresult = await this.productRepository
        .createQueryBuilder('product')
        .select(['product.id', 'product.name', 'product.type'])
        .innerJoin('product.sfgsku', 'sfgSku')
        .innerJoin('sfgSku.client', 'client')
        .where('client.id = :clientId', { clientId })
        .andWhere('product.type = :type', { type })
        .getRawAndEntities();

        result=sfgresult.entities;
        count=sfgresult.raw.length;
        
      break;
    case 'RM':
      const rmresult = await this.productRepository
        .createQueryBuilder('product')
        .select(['product.id', 'product.name', 'product.type'])
        .innerJoin('product.rmsku', 'rmSku')
        .innerJoin('rmSku.client', 'client')
        .where('client.id = :clientId', { clientId })
        .andWhere('product.type = :type', { type })
        .getRawAndEntities();

        result=rmresult.entities;
        count=rmresult.raw.length;
      break;
    default:
      throw new BadRequestException('Invalid product type');
  }
  

  return {
    message: "Successfully returned products for a client.",
    data: result,
    count:count
  };
}

async getAllSkuForProduct(clientId:string, productId:string):Promise<{message:string, productSkus:FgSku[], count:number}>{
  if(!productId || !clientId){
    throw new BadRequestException('Invalid Product Id')
  }
  const result=await this.fgskuRepository
          .createQueryBuilder('fg_sku')
          .select(['fg_sku.id', 'fg_sku.materialDescription', 'fg_sku.materialNumber'])
          .where('fg_sku.client =:clientId', {clientId})
          .andWhere('fg_sku.product=:productId', {productId})
          .getRawAndEntities();
  const data=result.entities;
  const count=result.raw.length;

  return{
    message:"Successfully Fetched relevant FG SKUs",
    productSkus:data,
    count:count
  }



}

async getInventory(fgSkuId:string):Promise<{ data:TransformedInventoryData[], count:number}>{


  const result=await this.sfgskuRepository
            .createQueryBuilder('sfg')
            .select([
              'sfg.id',
              'sfg.materialDescription',
              'sfg.inventory',
              'sfg.materialNumber',
              'sfg.fgRequiredQty',
              'sfg.rmRequiredQty',
              'fg.materialDescription',
              'fg.inventory',
              'fg.materialNumber',
              'rm.id',
              'rm.inventory',
              'rm.materialDescription',
              'rm.materialGrade',
            ])
            .leftJoin('sfg.fgsku', 'fg')
            .leftJoin('sfg.rmsku', 'rm')
            .where('fg.id = :fgSkuId', { fgSkuId })
            .getRawAndEntities();
    
    
    const transformedResult: TransformedInventoryData[]=result.raw.map((item)=> ({
      fg:{
        fg_id:item.fg_id,
        fg_materialNumber:item.fg_materialNumber,
        fg_materialDescription:item.fg_materialDescription,
        fg_inventory:item.fg_inventory,
        fg_sfgRequired: item.sfg_fgRequiredQty,
    
      },
      sfg: {
        sfg_materialDescription: item.sfg_materialDescription,
        sfg_inventory: item.sfg_inventory,
        sfg_rmRequired: item. sfg_rmRequiredQty,
      },
      rm: {
        rm_materialDescription: item.rm_materialDescription,
        rm_materialGrade:item.rm_materialGrade,
        rm_inventory: item.rm_inventory,
      },
    }));
    return {
      data:transformedResult,
      count:result.raw.length
    }

}



}
