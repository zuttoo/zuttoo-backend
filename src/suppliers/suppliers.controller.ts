import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SelectSupplierDto } from './dto/select-supplier.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post('ranking')
  @UseGuards(AuthGuard)
  async rankSuppliers(@Body() dto:SelectSupplierDto):Promise<any>{
    return await this.suppliersService.rankSuppliers(dto);
  }

}
