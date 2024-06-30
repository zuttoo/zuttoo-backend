import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptimaintainService } from './optimaintain.service';
import { CreateOptimaintainDto } from './dto/create-optimaintain.dto';
import { UpdateOptimaintainDto } from './dto/update-optimaintain.dto';

@Controller('optimaintain')
export class OptimaintainController {
  constructor(private readonly optimaintainService: OptimaintainService) {}

  @Post()
  create(@Body() createOptimaintainDto: CreateOptimaintainDto) {
    return this.optimaintainService.create(createOptimaintainDto);
  }

  @Get()
  findAll() {
    return this.optimaintainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optimaintainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptimaintainDto: UpdateOptimaintainDto) {
    return this.optimaintainService.update(+id, updateOptimaintainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optimaintainService.remove(+id);
  }
}
