import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FgSku } from 'src/orders/entities/fgsku.entity';
import { SFGSku } from 'src/orders/entities/sfgsku.entity';
import { RmSku } from 'src/orders/entities/rmsku.entity';

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

async getAllSkuForProduct(clientId:string, productId:string):Promise<{message:string, data:FgSku[], count:number}>{
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
    data:data,
    count:count
  }



}

async getInventory(fgskuId:string):Promise<{message:string, data:any, count:number}>{

  if(!fgskuId){
    throw new BadRequestException("Invalid FG SKU Id");
  }
  const result=await this.sfgskuRepository
            .createQueryBuilder('sfg')
            .select([
              'sfg.materialDescription AS sfg_materialDescription',
              'sfg.inventory AS sfg_inventory',
              // 'rm.id AS rm_id',
              'rm.materialDescription as rm_materialDescription',
              'rm.inventory AS rm_inventory',
            ])
            .leftJoin('sfg.fgsku', 'fg')
            .leftJoin('sfg.rmsku', 'rm')
            .andWhere('fg.id= :fgskuId', {fgskuId})
            .getRawAndEntities();
            console.log(result);
    
    return {
      message:"Successfully fetched inventory",
      data:result.raw,
      count:result.raw.length
    }

}

}
