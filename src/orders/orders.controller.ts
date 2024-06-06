import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { SkuService } from './sku.service';
import { GetOrderDto } from './dto';
import { GetConsignmentDto } from './dto/get-consignment.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService,
    private readonly skuService: SkuService,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getOrders(
    @Query() queryParams: GetOrderDto,
  ){
    return await this.ordersService.getOrders(queryParams);
  }

  @Get('track-consignment')
  @UsePipes(new ValidationPipe({transform:true}))
  async trackConsignment(
    @Query() queryParams: GetConsignmentDto
  ){
    return await this.ordersService.trackConsignment(queryParams);
  }

  @Get('rmsku')
  @UsePipes(new ValidationPipe({transform:true}))
  async getRmBySku(
    @Body() dto:{materialDescription:string, clientId:string}
  ){
    return await this.skuService.getRmBySku(dto.materialDescription, dto.clientId)
  }

  @Get('fgsku')
  @UsePipes(new ValidationPipe({transform:true}))
  async getFgBySku(
    @Body() dto:{materialDescription:string,materialNumber:string, clientId:string}
  ){
    return await this.skuService.getFgBySku(dto.materialDescription,dto.materialNumber, dto.clientId);
  }

  @Get('sfgsku')
  @UsePipes(new ValidationPipe({transform:true}))
  async getSfgBySku(
    @Body() dto:{materialDescription:string, clientId:string}
  ){
    return await this.skuService.getRmBySku(dto.materialDescription, dto.clientId)
  }
  

}
