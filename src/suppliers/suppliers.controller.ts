import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SelectSupplierDto } from './dto/select-supplier.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SapService } from 'src/sap/sap.service';
import { CreateClientSupplierDto } from './dto/create-client-supplier.dto';
import { RejectEmptyStringsPipe } from 'src/common/pipes/reject-empty-strings.pipe';
import { UpdateClientSupplierDto } from './dto/update-client-supplier.dto';
import { IoTThingsGraph } from 'aws-sdk';
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly sapService:SapService
  ) {}

  @Post()
  @UsePipes(RejectEmptyStringsPipe,new ValidationPipe({whitelist:true, transform:true}))
  async createSupplier(
    @Body() createDto:CreateClientSupplierDto
  ){
    return await this.suppliersService.createSuppliers(createDto);
  }

  @Patch(':id')
  @UsePipes(RejectEmptyStringsPipe,new ValidationPipe({whitelist:true, transform:true}))
  async updateSupplier(
    @Param('id') id:string,
    @Body() updateDto:UpdateClientSupplierDto
  ){
    return await this.suppliersService.updateSupplier(id, updateDto);
  }

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
