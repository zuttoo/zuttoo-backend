import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductDto } from './dto/get-product.dto';
import { GetSkuDto } from './dto/get-product-sku.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';



@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @UseGuards(JwtGuard)
  @Get()
  @UsePipes(new ValidationPipe({transform:true}))
  async getAllProducts(
    @Query() queryParams:GetProductDto
  ){
    return await this.productService.getAllProducts(queryParams.clientId, queryParams.type);
  }

  @Get('skus')
  @UsePipes(new ValidationPipe({transform:true}))
  async getAllSkuForProduct(
    @Query() queryParams:GetSkuDto
  ){
    return await this.productService.getAllSkuForProduct(queryParams.clientId,queryParams.productId);
  }

  @Get('inventory/:fgskuId')
  @UsePipes(new ValidationPipe({transform:true}))
  async getInventory(
    @Param('fgskuId') fgskuId:string
  ){
    return await this.productService.getInventory(fgskuId)
  }

}
