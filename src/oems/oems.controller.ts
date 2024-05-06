import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OemsService } from './oems.service';
import { CreateOemDto } from './dto/create-oem.dto';
import { UpdateOemDto } from './dto/update-oem.dto';

@Controller('oems')
export class OemsController {
  constructor(private readonly oemsService: OemsService) {}

  @Post()
  create(@Body() createOemDto: CreateOemDto) {
    return this.oemsService.create(createOemDto);
  }

  @Get()
  findAll() {
    return this.oemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOemDto: UpdateOemDto) {
    return this.oemsService.update(+id, updateOemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oemsService.remove(+id);
  }
}
