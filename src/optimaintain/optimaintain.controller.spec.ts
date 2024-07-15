import { Test, TestingModule } from '@nestjs/testing';
import { OptimaintainController } from './optimaintain.controller';
import { OptimaintainService } from './optimaintain.service';

describe('OptimaintainController', () => {
  let controller: OptimaintainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptimaintainController],
      providers: [OptimaintainService],
    }).compile();

    controller = module.get<OptimaintainController>(OptimaintainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
