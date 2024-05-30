import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities';
import { RmSku } from './entities/rmsku.entity';
import { FgSku } from './entities/fgsku.entity';
import { SFGSku } from './entities/sfgsku.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order, RmSku, FgSku, SFGSku])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports:[TypeOrmModule, OrdersService]
})
export class OrdersModule {}
