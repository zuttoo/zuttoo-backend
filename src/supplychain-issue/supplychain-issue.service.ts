import { Injectable } from '@nestjs/common';
import { CreateSupplychainIssueDto } from './dto/create-supplychain-issue.dto';
import { UpdateSupplychainIssueDto } from './dto/update-supplychain-issue.dto';

@Injectable()
export class SupplychainIssueService {
  create(createSupplychainIssueDto: CreateSupplychainIssueDto) {
    return 'This action adds a new supplychainIssue';
  }

  findAll() {
    return `This action returns all supplychainIssue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplychainIssue`;
  }

  update(id: number, updateSupplychainIssueDto: UpdateSupplychainIssueDto) {
    return `This action updates a #${id} supplychainIssue`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplychainIssue`;
  }
}
