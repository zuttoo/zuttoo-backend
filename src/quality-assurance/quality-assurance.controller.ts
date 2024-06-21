import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QualityAssuranceService } from './quality-assurance.service';
import { CreateQualityAssuranceDto } from './dto/create-quality-assurance.dto';
import { UpdateQualityAssuranceDto } from './dto/update-quality-assurance.dto';

@Controller('quality-assurance')
export class QualityAssuranceController {
  constructor(private readonly qualityAssuranceService: QualityAssuranceService) {}

  @Post()
  create(@Body() createQualityAssuranceDto: CreateQualityAssuranceDto) {
    return this.qualityAssuranceService.create(createQualityAssuranceDto);
  }

  @Get()
  findAll() {
    return this.qualityAssuranceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qualityAssuranceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQualityAssuranceDto: UpdateQualityAssuranceDto) {
    return this.qualityAssuranceService.update(+id, updateQualityAssuranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qualityAssuranceService.remove(+id);
  }
}
