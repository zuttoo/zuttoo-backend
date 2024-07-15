import { Module } from '@nestjs/common';
import { QualityAssuranceService } from './quality-assurance.service';
import { QualityAssuranceController } from './quality-assurance.controller';
import { TestCertificate } from './entities/test-certificate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OcrService } from 'src/ocr-service/ocr-service';
import { S3Service } from 'src/s3-service/s3-service';

@Module({
  imports:[TypeOrmModule.forFeature([TestCertificate])],
  controllers: [QualityAssuranceController],
  providers: [QualityAssuranceService,OcrService,S3Service],
})
export class QualityAssuranceModule {}
