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
import { SapService } from 'src/sap/sap.service';
import { Address } from 'src/addresses/entities/address.entity';
import { Client } from 'src/clients/entities/client.entity';
import { RmSku } from 'src/orders/entities/rmsku.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Supplier, Address, Client,RmSku]), ProductModule,OrdersModule,AuthModule,UsersModule],
  controllers: [SuppliersController, DashboardController],
  providers: [SuppliersService,AuthService,UsersService,SapService],
})
export class SuppliersModule {}
