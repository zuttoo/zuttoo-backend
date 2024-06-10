// supplychain-issue.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SupplyChainIssueService } from './supplychain-issue.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';
import { Attachment } from './entities/attachment.entity';
import { Repository } from 'typeorm';
import { S3Service } from './s3.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SupplyChainIssueService', () => {
  let service: SupplyChainIssueService;
  let supplyChainIssueRepository: Repository<SupplyChainIssue>;
  let attachmentRepository: Repository<Attachment>;
  let s3Service: S3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplyChainIssueService,
        {
          provide: getRepositoryToken(SupplyChainIssue),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Attachment),
          useClass: Repository,
        },
        {
          provide: S3Service,
          useValue: {
            uploadFile: jest.fn(),
            deleteFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SupplyChainIssueService>(SupplyChainIssueService);
    supplyChainIssueRepository = module.get(getRepositoryToken(SupplyChainIssue));
    attachmentRepository = module.get(getRepositoryToken(Attachment));
    s3Service = module.get(S3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateSupplyChainIssue', () => {
    it('should throw BadRequestException if no data provided', async () => {
      await expect(service.updateSupplyChainIssue('123', {}, [])).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if issue not found', async () => {
      jest.spyOn(supplyChainIssueRepository, 'findOne').mockResolvedValue(null);
      await expect(service.updateSupplyChainIssue('123', { title: 'New Title' }, [])).rejects.toThrow(NotFoundException);
    });

    it('should update issue properties', async () => {
      const mockIssue = { id: '123', title: 'Old Title', attachments: [] };
      jest.spyOn(supplyChainIssueRepository, 'findOne').mockResolvedValue(mockIssue as any);
      jest.spyOn(supplyChainIssueRepository, 'save').mockResolvedValue({ ...mockIssue, title: 'New Title' } as any);

      const result = await service.updateSupplyChainIssue('123', { title: 'New Title' }, []);
      expect(result.title).toBe('New Title');
    });

    it('should handle new attachments', async () => {
      const mockIssue = { id: '123', attachments: [] };
      const mockFile = { buffer: Buffer.from('test'), originalname: 'test.txt' } as Express.Multer.File;
      
      jest.spyOn(supplyChainIssueRepository, 'findOne').mockResolvedValue(mockIssue as any);
      jest.spyOn(s3Service, 'uploadFile').mockResolvedValue('http://s3.com/test.txt');
      jest.spyOn(attachmentRepository, 'create').mockReturnValue({ s3Link: 'http://s3.com/test.txt' } as any);
      jest.spyOn(supplyChainIssueRepository, 'save').mockResolvedValue({ ...mockIssue, attachments: [{ s3Link: 'http://s3.com/test.txt' }] } as any);

      const result = await service.updateSupplyChainIssue('123', {}, [mockFile]);
      expect(result.attachments).toHaveLength(1);
      expect(result.attachments[0].s3Link).toBe('http://s3.com/test.txt');
    });

    it('should remove attachments', async () => {
      const mockIssue = { 
        id: '123', 
        attachments: [{ id: 'att1', s3Link: 'http://s3.com/test1.txt' }, { id: 'att2', s3Link: 'http://s3.com/test2.txt' }] 
      };

      jest.spyOn(supplyChainIssueRepository, 'findOne').mockResolvedValue(mockIssue as any);
      jest.spyOn(s3Service, 'deleteFile').mockResolvedValue(undefined);
      jest.spyOn(attachmentRepository, 'remove').mockResolvedValue(undefined);
      jest.spyOn(supplyChainIssueRepository, 'save').mockResolvedValue({ ...mockIssue, attachments: [{ id: 'att2', s3Link: 'http://s3.com/test2.txt' }] } as any);

      const result = await service.updateSupplyChainIssue('123', { attachmentsToRemove: ['att1'] }, []);
      expect(result.attachments).toHaveLength(1);
      expect(result.attachments[0].id).toBe('att2');
    });
  });
});