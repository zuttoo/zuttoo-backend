import { Test, TestingModule } from '@nestjs/testing';
import { SupplychainIssueController } from './supplychain-issue.controller';
import { SupplychainIssueService } from './supplychain-issue.service';

describe('SupplychainIssueController', () => {
  let controller: SupplychainIssueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplychainIssueController],
      providers: [SupplychainIssueService],
    }).compile();

    controller = module.get<SupplychainIssueController>(SupplychainIssueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
