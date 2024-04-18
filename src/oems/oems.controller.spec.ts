import { Test, TestingModule } from '@nestjs/testing';
import { OemsController } from './oems.controller';
import { OemsService } from './oems.service';

describe('OemsController', () => {
  let controller: OemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OemsController],
      providers: [OemsService],
    }).compile();

    controller = module.get<OemsController>(OemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
