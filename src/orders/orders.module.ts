import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities';
import { RmSku } from './entities/rmsku.entity';
import { FgSku } from './entities/fgsku.entity';
import { SFGSku } from './entities/sfgsku.entity';
import { OrderLineItem } from './entities/order-lineitem.entity';
import { RmSkuStage } from './entities/rmskustage.entity';
import { SkuService } from './sku.service';

@Module({
  imports:[TypeOrmModule.forFeature([Order, RmSku, FgSku, SFGSku, OrderLineItem, RmSkuStage])],
  controllers: [OrdersController],
  providers: [OrdersService, SkuService],
  exports:[TypeOrmModule, OrdersService,SkuService]
})
export class OrdersModule {}
