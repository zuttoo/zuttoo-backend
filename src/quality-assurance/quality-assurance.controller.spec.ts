import { Test, TestingModule } from '@nestjs/testing';
import { QualityAssuranceController } from './quality-assurance.controller';
import { QualityAssuranceService } from './quality-assurance.service';

describe('QualityAssuranceController', () => {
  let controller: QualityAssuranceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualityAssuranceController],
      providers: [QualityAssuranceService],
    }).compile();

    controller = module.get<QualityAssuranceController>(QualityAssuranceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
