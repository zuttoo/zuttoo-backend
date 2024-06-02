import { Module } from '@nestjs/common';
import { SupplychainIssueService } from './supplychain-issue.service';
import { SupplychainIssueController } from './supplychain-issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';
import { ReviewerComment } from './entities/reviewer-comment';


@Module({
  imports:[TypeOrmModule.forFeature([SupplyChainIssue,ReviewerComment])],
  controllers: [SupplychainIssueController],
  providers: [SupplychainIssueService],
  exports:[TypeOrmModule]
})
export class SupplychainIssueModule {}
