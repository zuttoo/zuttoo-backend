import { Module } from '@nestjs/common';
import { SupplychainIssueService } from './supplychain-issue.service';
import { SupplychainIssueController } from './supplychain-issue.controller';

@Module({
  controllers: [SupplychainIssueController],
  providers: [SupplychainIssueService],
})
export class SupplychainIssueModule {}
