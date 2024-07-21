import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestCertificateDto } from './dto/create-test-certificate.dto';

@Injectable()
export class QualityAssuranceService {
  
  constructor(
   
  ){}

  async createTestCertificate(dto:CreateTestCertificateDto):Promise<any>{
    return {
      message:"Succssfully created test cerfiticate in the db",
      data:dto
    }
  }
}
