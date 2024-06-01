import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FgSku } from 'src/orders/entities/fgsku.entity';
import { RmSku } from 'src/orders/entities/rmsku.entity';
import { SFGSku } from 'src/orders/entities/sfgsku.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product,FgSku,RmSku, SFGSku])],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[TypeOrmModule, ProductService]
})
export class ProductModule {}
