import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QualityAssuranceService } from './quality-assurance.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('qa')
export class QualityAssuranceController {
  constructor(private readonly qualityAssuranceService: QualityAssuranceService) {}

  @Post('upload-document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file:Express.Multer.File){

    return await this.qualityAssuranceService.processDocuments(file);
  }
  
}
