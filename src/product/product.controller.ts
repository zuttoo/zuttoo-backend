import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductDto } from './dto/get-product.dto';
import { GetSkuDto } from './dto/get-product-sku.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { validateHeaderValue } from 'http';
import { UpdateProductDto } from './dto/update-product.dto';



@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({transform:true}))
  async createProduct(
    @Body() createProductDto:CreateProductDto
  ){
    console.log(createProductDto);
    return await this.productService.createProductWithSku(createProductDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({transform:true}))
  async updateProduct(
    @Param('id') id:string, 
    updateProductDto:UpdateProductDto){
      
  }



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
