import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { OrdersService } from 'src/orders/orders.service';
import { RmSku } from 'src/orders/entities/rmsku.entity';

@Module({
  imports:[],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
