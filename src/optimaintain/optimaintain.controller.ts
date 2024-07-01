import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptimaintainService } from './optimaintain.service';
import { CreateIssueDto } from './dto/create-maintenance-issue.dto';
import { PriorityEnum, StatusEnum } from 'src/common/enums/common.enum';

@Controller('optimaintain')
export class OptimaintainController {
  constructor(private readonly optimaintainService: OptimaintainService) {}

  @Post()
  async createIssue(@Body() createIssueDto: CreateIssueDto) {
    return this.optimaintainService.createIssue(createIssueDto);
  }
  
  @Patch(':id')
  async updateIssue(@Param('id') id: string, @Body() updateIssueDto: Partial<CreateIssueDto>) {
    return this.optimaintainService.updateIssue(id, updateIssueDto);
  }
  
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: StatusEnum) {
    return this.optimaintainService.updateCompletionStatus(id, status);
  }
  
  @Patch(':id/severity')
  async updateSeverity(@Param('id') id: string, @Body('severity') severity: PriorityEnum) {
    return this.optimaintainService.updateSeverityLevel(id, severity);
  }
}
