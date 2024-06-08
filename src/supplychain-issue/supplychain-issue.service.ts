import { Injectable } from '@nestjs/common';
import { CreateSupplychainIssueDto } from './dto/create-supplychain-issue.dto';
import { UpdateSupplychainIssueDto } from './dto/update-supplychain-issue.dto';
import { GetSupplyChainIssuesDto } from './dto/get-supplychain-issues.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import {uploadFilesToS3} from '../common/utils/s3-utils';
import { Client } from 'src/clients/entities/client.entity';


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

async getAllSupplyChainIssues(dto:GetSupplyChainIssuesDto):Promise<{issues:SupplyChainIssue[], totalCount:number, currentPage:number, totalPages:number}>{

  const {clientId, page, limit}=dto;

  const skip=(page-1)* limit;
  const take=limit;
  const [issues, totalCount]=await this.supplyChainIssueRepository
            .createQueryBuilder('sci')
            .where('sci.clientId= :clientId', {clientId})
            .leftJoinAndSelect('sci.supplier', 'supplier')
            .skip(skip)
            .take(take)
            .select([
              'sci.issueId',
              'sci.title',
              'sci.issueId',
              'sci.purchaseOrderNumber',
              'sci.deliveryOrderNumber',
              'sci.vehicleNumber',
              'sci.description',
              'sci.priority',
              'sci.status',
              'supplier.name'
              


            ])
            .getManyAndCount()



  return {
    issues:issues,
    totalCount,
    currentPage:page,
    totalPages:Math.ceil(totalCount/limit)
  }

}
}
