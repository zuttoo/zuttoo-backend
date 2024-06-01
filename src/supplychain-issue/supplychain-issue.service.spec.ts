import { Test, TestingModule } from '@nestjs/testing';
import { SupplychainIssueService } from './supplychain-issue.service';

describe('SupplychainIssueService', () => {
  let service: SupplychainIssueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplychainIssueService],
    }).compile();

    service = module.get<SupplychainIssueService>(SupplychainIssueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
