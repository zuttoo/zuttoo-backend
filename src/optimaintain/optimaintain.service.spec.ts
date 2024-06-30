import { Test, TestingModule } from '@nestjs/testing';
import { OptimaintainService } from './optimaintain.service';

describe('OptimaintainService', () => {
  let service: OptimaintainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptimaintainService],
    }).compile();

    service = module.get<OptimaintainService>(OptimaintainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
