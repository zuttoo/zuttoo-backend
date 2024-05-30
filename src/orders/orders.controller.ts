import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { GetOrderDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getOrders(
    @Query() queryParams: GetOrderDto,
  ){
    return await this.ordersService.getOrders(queryParams);
  }
}
