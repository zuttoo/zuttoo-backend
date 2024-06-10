import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Query, UsePipes, ValidationPipe, HttpCode, HttpStatus, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { SupplyChainIssueService } from './supplychain-issue.service';
import { CreateSupplychainIssueDto } from './dto/create-supplychain-issue.dto';
import { UpdateSupplyChainIssueDto } from './dto/update-supplychain-issue.dto';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GetSupplyChainIssuesDto } from './dto/get-supplychain-issues.dto';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';
import { PriorityEnum, StatusEnum } from 'src/common/enums/common.enum';

@Controller('supplychain')
export class SupplyChainIssueController {
  constructor(private readonly supplyChainIssueService: SupplyChainIssueService) {}



    @Get('issues')
    @UsePipes(new ValidationPipe({transform:true}))
    async getAllSupplyChainIssues(
        @Query() dto:GetSupplyChainIssuesDto
    ){
        return await this.supplyChainIssueService.getAllSupplyChainIssues(dto)
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'attachments', maxCount: 10 }]))
    async createSupplyChainIssue(
        @Body() createSupplyChainIssueDto: CreateSupplychainIssueDto,
        @UploadedFiles() files: { attachments?: Express.Multer.File[] },
    ) {
        const attachments = files.attachments || [];
        const supplyChainIssue = await this.supplyChainIssueService.createSupplyChainIssue(
            createSupplyChainIssueDto,
            attachments,
        );
        return supplyChainIssue;
    }

  @Patch('issues/:id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('files', 5, { limits: { fileSize: 5 * 1024 * 1024 } })) // Max 5 files, 5MB each
  async updateSupplyChainIssue(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateSupplyChainIssueDto: UpdateSupplyChainIssueDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ): Promise<SupplyChainIssue> {
    // Validate DTO
    return this.supplyChainIssueService.updateSupplyChainIssue(id, updateSupplyChainIssueDto, files);
  }

    @Patch('/issues/:id/status')
    @HttpCode(HttpStatus.OK)
    async updateSupplyChainIssueStatus(
      @Param('id') id:string,
      @Body('status') status:StatusEnum,
    ){
      return this.supplyChainIssueService.updateSupplyChainIssueStatus(id,status);
    }

    @Patch('/issues/:id/priority')
    @HttpCode(HttpStatus.OK)
    async updateSupplyChainIssuePriority(
      @Param('id') id:string,
      @Body('priority') priority:PriorityEnum,
    ){
      return this.supplyChainIssueService.updateSupplyChainIssuePriority(id, priority)
    }

    @Delete('/issues/:id')
    async softDelete(@Param('id') id: string) {
      await this.supplyChainIssueService.softDelete(id);
      return { message: `SupplyChainIssue with ID ${id} has been soft-deleted` };
    }
}
