import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { OrdersModule } from 'src/orders/orders.module';
import { Supplier } from './entities/supplier.entity';
import { DashboardController } from './dashboard/dashboard.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Supplier]), ProductModule,OrdersModule],
  controllers: [SuppliersController, DashboardController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
