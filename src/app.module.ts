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
import { MailModule } from './Mail/Mail.module';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';
import { SupplyChainIssueModule } from './supplychain-issue/supplychain-issue.module';
import { QualityAssuranceModule } from './quality-assurance/quality-assurance.module';
import { S3ServiceService } from './s3-service/s3-service.service';


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
    QualityAssuranceModule,
   
  ],
  controllers: [AppController],
  providers: [AppService, S3ServiceService],
})
export class AppModule {}
