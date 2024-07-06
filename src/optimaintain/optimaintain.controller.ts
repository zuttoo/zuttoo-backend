import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OptimaintainService } from './optimaintain.service';
import { CreateIssueDto } from './dto/create-maintenance-issue.dto';
import { PriorityEnum, StatusEnum } from 'src/common/enums/common.enum';
import { CreateProcessLineDto } from './dto/create-process-line.dto';
import { UpdateProcessLineDto } from './dto/update-process-line.dto';

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
  @Post('process-line')
  @UsePipes(new ValidationPipe({whitelist:true}))
  createProcessLine(@Body() dto:CreateProcessLineDto){
    return this.optimaintainService.createProcessLine(dto);
  }

  @Patch('process-line/:id')
  @UsePipes(new ValidationPipe({whitelist:true}))
  updateProcessLine(@Param('id') id:string, @Body() dto:UpdateProcessLineDto){
    return this.optimaintainService.updateProcessLine(id,dto);
  }
}
