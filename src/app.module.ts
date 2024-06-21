import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm-config';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OemsModule } from './oems/oems.module';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './Mail/Mail.module';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';
import { SupplyChainIssueModule } from './supplychain-issue/supplychain-issue.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig.options),
   
    AddressesModule,
    ClientsModule,
    SuppliersModule,
    UsersModule,
    AuthModule,
    // MailModule,
    OrdersModule,
    OemsModule,
    ProductModule,
    SupplyChainIssueModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
