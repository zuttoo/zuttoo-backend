import { Injectable } from '@nestjs/common';
import { CreateSupplychainIssueDto } from './dto/create-supplychain-issue.dto';
import { UpdateSupplychainIssueDto } from './dto/update-supplychain-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import {uploadFilesToS3} from '../common/utils/s3-utils';


@Injectable()
export class SupplychainIssueService {
 constructor(@InjectRepository(SupplyChainIssue) private readonly supplyChainIssueRepository:Repository<SupplyChainIssue>,
            @InjectRepository(Attachment) private readonly attachmentRepository:Repository<Attachment>

){}

async createSupplyChainIssue(
  createSupplyChainIssueDto: CreateSupplychainIssueDto,
  files: Express.Multer.File[],
): Promise<SupplyChainIssue> {
  const { attachments, ...supplyChainIssueData } = createSupplyChainIssueDto;

  const supplyChainIssue = this.supplyChainIssueRepository.create(supplyChainIssueData);

  if (files.length > 0) {
      const attachmentLinks = await uploadFilesToS3(files);
      const attachments = attachmentLinks.map((link) =>
          this.attachmentRepository.create({ s3Link: link, supplyChainIssue }),
      );
      supplyChainIssue.attachments = attachments;
  }

  return this.supplyChainIssueRepository.save(supplyChainIssue);
}
}
