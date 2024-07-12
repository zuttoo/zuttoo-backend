import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SelectSupplierDto } from './dto/select-supplier.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SapService } from 'src/sap/sap.service';
@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService,
    private readonly sapService:SapService
  ) {}

  @Post('ranking')
  @UseGuards(AuthGuard)
  async rankSuppliers(@Body() dto:SelectSupplierDto):Promise<any>{
    return await this.suppliersService.rankSuppliers(dto);
  }
  @Get('business-partners')
  async getAllBusinessPartners(){
    return await this.sapService.getAllBusinessPartners();
  }

}
