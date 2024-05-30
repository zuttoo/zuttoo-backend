import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SelectSupplierDto } from './dto/select-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post('ranking')
  async rankSuppliers(@Body() dto:SelectSupplierDto):Promise<any>{
    return await this.suppliersService.rankSuppliers(dto);
  }

}
