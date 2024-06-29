import { Test, TestingModule } from '@nestjs/testing';
import { QualityAssuranceService } from './quality-assurance.service';

describe('QualityAssuranceService', () => {
  let service: QualityAssuranceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualityAssuranceService],
    }).compile();

    service = module.get<QualityAssuranceService>(QualityAssuranceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
