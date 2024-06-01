import { Module } from '@nestjs/common';
import { SupplychainIssueService } from './supplychain-issue.service';
import { SupplychainIssueController } from './supplychain-issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainIssueCategory } from './entities/supplychain-issue-category.entity';
import { SupplychainIssue } from './entities/supplychain-issue.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SupplyChainIssueCategory, SupplychainIssue])],
  controllers: [SupplychainIssueController],
  providers: [SupplychainIssueService],
})
export class SupplychainIssueModule {}
