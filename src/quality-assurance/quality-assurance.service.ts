import { Injectable } from '@nestjs/common';
import { CreateQualityAssuranceDto } from './dto/create-quality-assurance.dto';
import { UpdateQualityAssuranceDto } from './dto/update-quality-assurance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestCertificate } from './entities/test-certificate.entity';
import { Repository } from 'typeorm';
import { CreateTestCertificateDto } from './dto/create-test-certificate.dto';
import { OcrService } from 'src/ocr-service/ocr-service';

@Injectable()
export class QualityAssuranceService {
  
  constructor(
    private  ocrService:OcrService,
    @InjectRepository(TestCertificate) private readonly testCertificateRepository:Repository<TestCertificate>
  ){}

  async processDocuments(file:Express.Multer.File):Promise<any>{
    return await this.ocrService.processTestCertificate(file);
  }

}
