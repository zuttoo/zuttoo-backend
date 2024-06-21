import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { OrdersModule } from 'src/orders/orders.module';
import { Supplier } from './entities/supplier.entity';
import { DashboardController } from './dashboard/dashboard.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports:[TypeOrmModule.forFeature([Supplier]), ProductModule,OrdersModule,AuthModule,UsersModule],
  controllers: [SuppliersController, DashboardController],
  providers: [SuppliersService,AuthService,UsersService],
})
export class SuppliersModule {}
