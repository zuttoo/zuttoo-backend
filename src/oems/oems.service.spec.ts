import { Test, TestingModule } from '@nestjs/testing';
import { OemsService } from './oems.service';

describe('OemsService', () => {
  let service: OemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OemsService],
    }).compile();

    service = module.get<OemsService>(OemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
