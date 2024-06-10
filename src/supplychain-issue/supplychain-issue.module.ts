import { Module } from '@nestjs/common';
import { SupplyChainIssueService } from './supplychain-issue.service';
import { SupplyChainIssueController } from './supplychain-issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyChainIssue } from './entities/supplychain-issue.entity';
import { Comment } from './entities/comment';
import { Attachment } from './entities/attachment.entity';


@Module({
  imports:[TypeOrmModule.forFeature([SupplyChainIssue,Comment, Attachment])],
  controllers: [SupplyChainIssueController],
  providers: [SupplyChainIssueService],
  exports:[TypeOrmModule]
})
export class SupplyChainIssueModule {}
