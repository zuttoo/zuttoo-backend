import { Module } from '@nestjs/common';
import { OptimaintainService } from './optimaintain.service';
import { OptimaintainController } from './optimaintain.controller';
import { MaintenanceIssue } from './entities/maintenance-issue.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([MaintenanceIssue])],
  controllers: [OptimaintainController],
  providers: [OptimaintainService],
})
export class OptimaintainModule {}
