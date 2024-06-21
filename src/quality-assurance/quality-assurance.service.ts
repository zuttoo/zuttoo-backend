import { Injectable } from '@nestjs/common';
import { CreateQualityAssuranceDto } from './dto/create-quality-assurance.dto';
import { UpdateQualityAssuranceDto } from './dto/update-quality-assurance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RmSkuCharacteristics } from './entities/rmsku-characteristics.entity';
import { Repository } from 'typeorm';
import { CreateTestCertificateDto } from './dto/create-test-certificate.dto';

@Injectable()
export class QualityAssuranceService {
  constructor(
    @InjectRepository(RmSkuCharacteristics) private readonly rmSkuCharacteristicRepository:Repository<RmSkuCharacteristics>
  ){}

  async createTestCertificate(dto:CreateTestCertificateDto):Promise<any>{
    return {
      message:"Succssfully created test cerfiticate in the db",
      data:dto
    }
  }
}
