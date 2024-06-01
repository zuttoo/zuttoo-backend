import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplychainIssueService } from './supplychain-issue.service';
import { CreateSupplychainIssueDto } from './dto/create-supplychain-issue.dto';
import { UpdateSupplychainIssueDto } from './dto/update-supplychain-issue.dto';

@Controller('supplychain-issue')
export class SupplychainIssueController {
  constructor(private readonly supplychainIssueService: SupplychainIssueService) {}

  @Post()
  create(@Body() createSupplychainIssueDto: CreateSupplychainIssueDto) {
    return this.supplychainIssueService.create(createSupplychainIssueDto);
  }

  @Get()
  findAll() {
    return this.supplychainIssueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplychainIssueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplychainIssueDto: UpdateSupplychainIssueDto) {
    return this.supplychainIssueService.update(+id, updateSupplychainIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplychainIssueService.remove(+id);
  }
}
