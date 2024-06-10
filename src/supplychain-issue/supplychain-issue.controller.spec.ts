// supplychain-issue.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SupplyChainIssueController } from './supplychain-issue.controller';
import { SupplyChainIssueService } from './supplychain-issue.service';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';

describe('SupplyChainIssueController', () => {
  let controller: SupplyChainIssueController;
  let service: SupplyChainIssueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyChainIssueController],
      providers: [
        {
          provide: SupplyChainIssueService,
          useValue: {
            updateSupplyChainIssue: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SupplyChainIssueController>(SupplyChainIssueController);
    service = module.get<SupplyChainIssueService>(SupplyChainIssueService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateSupplyChainIssue', () => {
    it('should call service.updateSupplyChainIssue with correct params', async () => {
      const mockDto = { title: 'Updated Title' };
      const mockFiles = [{ buffer: Buffer.from('test'), originalname: 'test.txt' }] as Express.Multer.File[];
      const mockResult: SupplyChainIssue = { id: '123', title: 'Updated Title' } as SupplyChainIssue;

      jest.spyOn(service, 'updateSupplyChainIssue').mockResolvedValue(mockResult);

      const result = await controller.updateSupplyChainIssue('123', mockDto, mockFiles);

      expect(service.updateSupplyChainIssue).toHaveBeenCalledWith('123', mockDto, mockFiles);
      expect(result).toBe(mockResult);
    });

    it('should handle no files gracefully', async () => {
      const mockDto = { title: 'Updated Title' };
      const mockResult: SupplyChainIssue = { id: '123', title: 'Updated Title' } as SupplyChainIssue;

      jest.spyOn(service, 'updateSupplyChainIssue').mockResolvedValue(mockResult);

      const result = await controller.updateSupplyChainIssue('123', mockDto, undefined);

      expect(service.updateSupplyChainIssue).toHaveBeenCalledWith('123', mockDto, undefined);
      expect(result).toBe(mockResult);
    });
  });
});