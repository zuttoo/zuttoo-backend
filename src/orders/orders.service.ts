import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Order} from './entities';
import { OrderLineItem } from './entities/order-lineitem.entity';
import { RmSku } from './entities/rmsku.entity';
import { RmSkuStage } from './entities/rmskustage.entity';
import { GetOrderDto } from './dto';
import { DefaultDto } from 'src/common/default.dto';
import { GetConsignmentDto } from './dto/get-consignment.dto';



@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
   @InjectRepository(OrderLineItem) private orderLineItemRepository: Repository<OrderLineItem>,
    @InjectRepository(RmSku) private rmSkuRepository: Repository<RmSku>,
    @InjectRepository(RmSkuStage)private rmSkuStageRepository: Repository<RmSkuStage>
             
  
){}
  
async getOrders(dto: GetOrderDto): Promise<{
  data: Order[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}> {
  const { clientId, materialType, page, limit } = dto;
  const skip = (page - 1) * limit;
  const take = limit;
  const query = this.orderRepository
    .createQueryBuilder('o')
    .where('o.clientId = :clientId', { clientId })
    .leftJoinAndSelect('o.orderLineItem', 'oli')
    .leftJoinAndSelect('o.oem', 'oem')
    .leftJoinAndSelect('o.supplier', 'supplier')
    .leftJoinAndSelect('oli.rmsku', 'rm')
    .leftJoinAndSelect('oli.rmskustage', 'rmskustage');

  if (materialType !== 'ALL') {
    query.andWhere('o.materialType = :materialType', {
      materialType,
    });
  }

  const [orders, totalCount] = await query
    .skip(skip)
    .take(take)
    .select([
      'o.purchaseOrderNumber',
      'o.purchaseOrderDate',
      'o.actualDeliveryDate',
      'o.projectedDeliveryDate',
      'o.deliveryDate',
      'o.lastStatusUpdatedAt',
      'o.materialType',
      'o.status',
      'o.id',
      'oem.name',
      'supplier.name',
      'oli.id',
      // 'oli.quantityNos',
      // 'oli.quantityMtrs',
      // 'oli.quantityTonnage',
      'oli.rmskuId',
      'rm.materialDescription',
      'rmskustage.stage',
      'rmskustage.id',
      
    ])
    .getManyAndCount();

  return {
    data: orders,
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
  };
}

  //track consignment endpoint
  async trackConsignment(dto:GetConsignmentDto):Promise<{
    data:Order[];
    totalCount:number;
    currentPage: number;
    totalPages:number;
  
  
  }>{
    const {clientId,page, limit, orderId}= dto;

    const skip=(page-1) *limit;
    const take=limit;

    const query=this.orderRepository
        .createQueryBuilder('o')
        .where('o.id= :orderId', {orderId})
        .andWhere('o.clientId= :clientId',{clientId})
        .leftJoinAndSelect('o.orderLineItem', 'oli')
        .leftJoinAndSelect('oli.rmsku', 'rm')
        .leftJoinAndSelect('oli.rmskustage', 'rmskustage')

        const [orders, totalCount]=await query
            .skip(skip)
            .take(take)
            .select([
              'o.id',
              'oli.id',
              'oli.rmskuId',
              'rm.materialDescription',
              'rmskustage'

            ])
            .getManyAndCount();
          
        return{
          data:orders,
          totalCount,
          currentPage:page,
          totalPages:Math.ceil(totalCount/limit)
        }
  }
  
 
}
