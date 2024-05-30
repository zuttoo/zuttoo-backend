import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Order} from './entities/index';
import { GetOrderDto } from './dto';



@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>,
             
  
){}
  
  async getOrders(
  dto:GetOrderDto,
  ): Promise<{data:Order[];totalCount:number; currentPage:number; totalPages:number}>{

    const {clientId, materialType, page, limit}=dto;
    const skip = (page - 1) * limit;
    const take = limit;

    const query = this.orderRepository
    .createQueryBuilder('o')
    .where('o.clientId = :clientId', { clientId });

  if (materialType !== 'all') {
    query.andWhere('o.materialType = :materialType', {
      materialType,
    });
  }

  const [orders, totalCount] = await query
    .skip(skip)
    .take(take)
    .getManyAndCount();

  return {
    data: orders,
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
  };


  }

 
}
