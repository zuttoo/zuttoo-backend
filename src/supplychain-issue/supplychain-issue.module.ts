import { Module } from '@nestjs/common';
import { SupplychainIssueService } from './supplychain-issue.service';
import { SupplychainIssueController } from './supplychain-issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';
import { Comment } from './entities/comment';
import { Attachment } from './entities/attachment.entity';


@Module({
  imports:[TypeOrmModule.forFeature([SupplyChainIssue,Comment, Attachment])],
  controllers: [SupplychainIssueController],
  providers: [SupplychainIssueService],
  exports:[TypeOrmModule]
})
export class SupplychainIssueModule {}
