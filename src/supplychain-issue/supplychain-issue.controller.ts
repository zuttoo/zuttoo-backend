import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SupplychainIssueService } from './supplychain-issue.service';
import { CreateSupplychainIssueDto } from './dto/create-supplychain-issue.dto';
import { UpdateSupplychainIssueDto } from './dto/update-supplychain-issue.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetSupplyChainIssuesDto } from './dto/get-supplychain-issues.dto';

@Controller('supplychain')
export class SupplychainIssueController {
  constructor(private readonly supplyChainIssueService: SupplychainIssueService) {}



    @Get('issues')
    @UsePipes(new ValidationPipe({transform:true}))
    async getAllSupplyChainIssues(
        @Query() dto:GetSupplyChainIssuesDto
    ){
        console.log(dto);
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
}
