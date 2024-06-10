import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplychainIssueDto } from './dto/create-supplychain-issue.dto';
import { UpdateSupplyChainIssueDto } from './dto/update-supplychain-issue.dto';
import { GetSupplyChainIssuesDto } from './dto/get-supplychain-issues.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import {uploadFilesToS3, deleteFileFromS3} from '../common/utils/s3-utils';
import { throwError } from 'rxjs';
import { PriorityEnum, StatusEnum } from 'src/common/enums/common.enum';


@Injectable()
export class SupplyChainIssueService {
 constructor(@InjectRepository(SupplyChainIssue) private readonly supplyChainIssueRepository:Repository<SupplyChainIssue>,
            @InjectRepository(Attachment) private readonly attachmentRepository:Repository<Attachment>

){}

async createSupplyChainIssue(
  createSupplyChainIssueDto: CreateSupplychainIssueDto,
  files: Express.Multer.File[],
): Promise<SupplyChainIssue> {
  const { attachments, ...supplyChainIssueData } = createSupplyChainIssueDto;

  const supplyChainIssue = this.supplyChainIssueRepository.create(supplyChainIssueData as DeepPartial<SupplyChainIssue>);

  if (files.length > 0) {
      const attachmentLinks = await uploadFilesToS3(files);
      const attachments = attachmentLinks.map((link) =>
          this.attachmentRepository.create({ s3Link: link, supplyChainIssue }),
      );
      supplyChainIssue.attachments = attachments;
  }

  return this.supplyChainIssueRepository.save(supplyChainIssue);
}

async updateSupplyChainIssue(
  id: string,
  updateSupplyChainIssueDto: UpdateSupplyChainIssueDto,
  files?: Express.Multer.File[],
): Promise<SupplyChainIssue> {
  const supplyChainIssue = await this.supplyChainIssueRepository.findOne({
    where: { id },
    relations: ['attachments'],
  });

  if (!supplyChainIssue) {
    throw new NotFoundException(`SupplyChainIssue with ID ${id} not found`);
  }

  // Update the SupplyChainIssue properties
  const { attachments: attachmentsToRemove, ...updateData } = updateSupplyChainIssueDto;
  Object.assign(supplyChainIssue, updateData as DeepPartial<SupplyChainIssue>);

  // Handle new attachments
  if (files && files.length > 0) {
    const newAttachmentLinks = await Promise.all(files.map(file => uploadFilesToS3(file)));
    const newAttachments = newAttachmentLinks.map(link =>
      this.attachmentRepository.create({ s3Link: link, supplyChainIssue } as DeepPartial<Attachment>),
    );
    supplyChainIssue.attachments = [
      ...(supplyChainIssue.attachments || []),
      ...newAttachments,
    ];
  }

  // Remove attachments if specified in DTO
  if (attachmentsToRemove && attachmentsToRemove.length > 0) {
    const attachmentsToDelete = supplyChainIssue.attachments.filter(
      (attachment) => attachmentsToRemove.includes(attachment.id),
    );

    // Delete attachments from S3 and database
    await Promise.all(attachmentsToDelete.map(attachment => this.deleteAttachment(attachment.id)));

    // Update the attachments array
    supplyChainIssue.attachments = supplyChainIssue.attachments.filter(
      (attachment) => !attachmentsToRemove.includes(attachment.id),
    );
  }

  // Save the updated SupplyChainIssue
  return this.supplyChainIssueRepository.save(supplyChainIssue);
}


async getAllSupplyChainIssues(dto:GetSupplyChainIssuesDto):Promise<{issues:SupplyChainIssue[], totalCount:number, currentPage:number, totalPages:number}>{

  const {clientId, page, limit}=dto;

  const skip=(page-1)* limit;
  const take=limit;
  const [issues, totalCount]=await this.supplyChainIssueRepository
            .createQueryBuilder('supplychainissue')
            .where('supplychainissue.clientId= :clientId', {clientId})
            .leftJoinAndSelect('supplychainissue.supplier', 'supplier')
            .skip(skip)
            .take(take)
            .select([
              'supplychainissue.id',
              'supplychainissue.issueId',
              'supplychainissue.title',
              'supplychainissue.issueId',
              'supplychainissue.purchaseOrderNumber',
              'supplychainissue.deliveryOrderNumber',
              'supplychainissue.vehicleNumber',
              'supplychainissue.description',
              'supplychainissue.priority',
              'supplychainissue.status',
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

async updateSupplyChainIssueStatus(id:string, status:StatusEnum):Promise<Partial<SupplyChainIssue>>{
  const updateResult=await this.supplyChainIssueRepository
        .createQueryBuilder()
        .update(SupplyChainIssue)
        .set({status})
        .where("id= :id", {id})
        .returning(['id', 'status'])
        .execute();

  if(updateResult.affected===0){
    throw new NotFoundException(`SupplyChainIssue with ID ${id} not found`);
  }
  return {
    id,
    status
  }
}
async updateSupplyChainIssuePriority(id:string, priority:PriorityEnum):Promise<Partial<SupplyChainIssue>>{
  const updateResult=await this.supplyChainIssueRepository
          .createQueryBuilder()
          .update(SupplyChainIssue)
          .set({priority})
          .where("id= :id", {id})
          .returning(['id', 'priority'])
          .execute()
  if(updateResult.affected===0){
        throw new NotFoundException(`SupplyChainIssue with ID ${id} not found`);
    }
    return {
      id,
      priority
    }
}

private async deleteAttachment(id:string):Promise<void>{
  const attachment=await this.attachmentRepository.findOne({
    where:{id}
  });

  if(attachment){
    try{
      await deleteFileFromS3(attachment.s3Link);
      await this.attachmentRepository.remove(attachment);
      console.log(`Attachment with ID ${id} deleted successfully`);
    }catch(err){
      console.error(`Error deleting attachment with ID ${id}:${err}`);
      throw new BadRequestException(err);
    }
  }else{
    console.warn(`Attachment with ID ${id} not found`);
  }
}
}
