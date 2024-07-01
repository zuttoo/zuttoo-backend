import { Module } from '@nestjs/common';
import { OptimaintainService } from './optimaintain.service';
import { OptimaintainController } from './optimaintain.controller';
import { MaintenanceIssue } from './entities/maintenance-issue.entity';
import { ProcessLine } from './entities/process-line.entity';
import { Component } from './entities/component.entity';
import { SparePart } from './entities/spare-part.entity';
import { Section } from './entities/section.entity';
import { Equipment } from './entities/equipment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([
    MaintenanceIssue, 
    ProcessLine,
    Section,
    Equipment, 
    Component,
    SparePart,
    Equipment])],
  controllers: [OptimaintainController],
  providers: [OptimaintainService],
})
export class OptimaintainModule {}
