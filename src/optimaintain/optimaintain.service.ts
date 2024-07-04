import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { MaintenanceIssue } from './entities/maintenance-issue.entity';
import { CreateIssueDto } from './dto/create-maintenance-issue.dto';
// import { PriorityEnum, StatusEnum, WorkstationEnum, ShiftEnum, MaintenanceTask, CommunicationChannel } from './enums';
import { PriorityEnum, StatusEnum,CommunicationChannel} from 'src/common/enums/common.enum';
import { WorkstationEnum, ShiftEnum, MaintenanceTask } from 'src/common/enums/optimaintain.enum';
import { ProcessLine } from './entities/process-line.entity';
import { Section } from './entities/section.entity';
import { Equipment } from './entities/equipment.entity';
import { SparePart } from './entities/spare-part.entity';
import { Component } from './entities/component.entity';
import { CreateProcessLineDto } from './dto/create-process-line.dto';
import { query } from 'express';
import { InternalErrorException } from '@aws-sdk/client-cognito-identity-provider';


type UpdateIssueDto = {
    [P in keyof CreateIssueDto]?: DeepPartial<CreateIssueDto[P]>;
  };
@Injectable()
export class OptimaintainService {
  constructor(
    @InjectRepository(MaintenanceIssue)
    private maintenanceIssueRepository: Repository<MaintenanceIssue>,
    @InjectRepository(ProcessLine)
    private processLineRepository:Repository<ProcessLine>,
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @InjectRepository(Component)
    private componentRepository: Repository<Component>,
    @InjectRepository(SparePart)
    private sparePartRepository: Repository<SparePart>,
    private dataSource:DataSource

  ) {}

  async createIssue(createDto: CreateIssueDto): Promise<MaintenanceIssue[]> {
    this.validateCreateDto(createDto);
    const newIssue = this.maintenanceIssueRepository.create(createDto);
    return await this.maintenanceIssueRepository.save(newIssue);
  }

  async updateIssue(issueId: string, updateDto:UpdateIssueDto): Promise<MaintenanceIssue> {
    const existingIssue = await this.findIssueById(issueId);
    this.validateUpdateDto(updateDto);
    await this.maintenanceIssueRepository.update({ issueId }, updateDto);
    return await this.maintenanceIssueRepository.findOne({ where: { issueId } });
  }

  async updateCompletionStatus(issueId: string, completionStatus: StatusEnum): Promise<MaintenanceIssue> {
    const existingIssue = await this.findIssueById(issueId);
    if (!Object.values(StatusEnum).includes(completionStatus)) {
      throw new BadRequestException(`Invalid completion status: ${completionStatus}`);
    }
    await this.maintenanceIssueRepository.update({ issueId }, { completionStatus });
    return await this.maintenanceIssueRepository.findOne({ where: { issueId } });
  }

  async updateSeverityLevel(issueId: string, severityLevel: PriorityEnum): Promise<MaintenanceIssue> {
    const existingIssue = await this.findIssueById(issueId);
    if (!Object.values(PriorityEnum).includes(severityLevel)) {
      throw new BadRequestException(`Invalid severity level: ${severityLevel}`);
    }
    await this.maintenanceIssueRepository.update({ issueId }, { severityLevel });
    return await this.maintenanceIssueRepository.findOne({ where: { issueId } });
  }

  async createProcessLine(createProcessLineDto:CreateProcessLineDto):Promise<ProcessLine>{
    const existingProcessLine=await this.processLineRepository.findOne({
      where:{
        name:createProcessLineDto.name
      }
    });
    if(existingProcessLine){
      throw new BadRequestException(`Process Line with name ${createProcessLineDto.name} already exists.`);
    }
    const queryRunner=this.dataSource.createQueryRunner();
    await queryRunner.connect();

    // start transaction
    await queryRunner.startTransaction();

    try{
      const processLine=this.processLineRepository.create({
        name:createProcessLineDto.name,
      });
      await queryRunner.manager.save(processLine);

      // create sections
      for(const sectionDto of createProcessLineDto.sections){
        const section=this.sectionRepository.create({
          name:sectionDto.name,
          processLine:processLine,
          
        });
        await queryRunner.manager.save(section);

        // Create Equipment
        for(const equipmentDto of sectionDto.equipments){
          const equipment=this.equipmentRepository.create({
            ...equipmentDto,
            section:section
          });
          await queryRunner.manager.save(equipment);

          // create components
          for(const componentDto of equipmentDto.components){
            const component=this.componentRepository.create({
              ...componentDto,
              equipment:equipment

            });
            await queryRunner.manager.save(component);
            // Create Spare Parts
            for (const sparePartDto of componentDto.spareParts) {
              const sparePart = this.sparePartRepository.create({
                ...sparePartDto,
                component:component
              });
              await queryRunner.manager.save(sparePart);
            }
          }
        }
      }
      await queryRunner.commitTransaction();
      return processLine;
    }catch(err){
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to create process line');
    }finally{
      await queryRunner.release();
    }

  }

  private async findIssueById(issueId: string): Promise<MaintenanceIssue> {
    const issue = await this.maintenanceIssueRepository.findOne({ where: { issueId} });
    if (!issue) {
      throw new NotFoundException(`Maintenance issue with ID "${issueId}" not found`);
    }
    return issue;
  }
  private isValidDate(date:any):boolean{
    if(date instanceof Date){
        return !isNaN(date.getTime());
    }

    if(typeof date==='string'|| typeof date==='number'){
        const parsedDate=new Date(date);
        return !isNaN(parsedDate.getTime())
    }
    return false;
    
  }

  private validateCreateDto(dto: CreateIssueDto): void {
    if (!dto.issueId || typeof dto.issueId !== 'string') {
      throw new BadRequestException('Invalid issueId');
    }
    if (!this.isValidDate(dto.issueDate)) {
      throw new BadRequestException('Invalid issueDate');
    }
    if (dto.workstation && !Object.values(WorkstationEnum).includes(dto.workstation as WorkstationEnum)) {
      throw new BadRequestException(`Invalid workstation: ${dto.workstation}`);
    }
    if (!Object.values(ShiftEnum).includes(dto.shift as ShiftEnum)) {
      throw new BadRequestException(`Invalid shift: ${dto.shift}`);
    }
    if (!Object.values(MaintenanceTask).includes(dto.maintenanceTask as MaintenanceTask)) {
      throw new BadRequestException(`Invalid maintenanceTask: ${dto.maintenanceTask}`);
    }
    if (dto.severityLevel && !Object.values(PriorityEnum).includes(dto.severityLevel as PriorityEnum)) {
      throw new BadRequestException(`Invalid severityLevel: ${dto.severityLevel}`);
    }
    if (typeof dto.isActionRequired !== 'boolean') {
      throw new BadRequestException('Invalid isActionRequired');
    }
    if (!Object.values(StatusEnum).includes(dto.completionStatus as StatusEnum)) {
      throw new BadRequestException(`Invalid completionStatus: ${dto.completionStatus}`);
    }
    if (!this.isValidDate(dto.scheduledCompletionDate)) {
      throw new BadRequestException('Invalid scheduledCompletionDate');
    }
    // if (dto.reviewers && !Array.isArray(dto.reviewers)) {
    //   throw new BadRequestException('Invalid reviewers');
    // }
    if (!Object.values(CommunicationChannel).includes(dto.communicationChannel as CommunicationChannel)) {
      throw new BadRequestException(`Invalid communicationChannel: ${dto.communicationChannel}`);
    }
  }

  private validateUpdateDto(dto: UpdateIssueDto): void {
    if (dto.issueId !== undefined && typeof dto.issueId !== 'string') {
      throw new BadRequestException('Invalid issueId');
    }
    if (dto.issueDate !== undefined && !this.isValidDate(dto.issueDate)) {
      throw new BadRequestException('Invalid issueDate');
    }
    if (dto.workstation !== undefined && 
        !Object.values(WorkstationEnum).includes(dto.workstation as WorkstationEnum)) {
      throw new BadRequestException(`Invalid workstation: ${dto.workstation}`);
    }
    if (dto.shift !== undefined && 
        !Object.values(ShiftEnum).includes(dto.shift as ShiftEnum)) {
      throw new BadRequestException(`Invalid shift: ${dto.shift}`);
    }
    if (dto.maintenanceTask !== undefined && 
        !Object.values(MaintenanceTask).includes(dto.maintenanceTask as MaintenanceTask)) {
      throw new BadRequestException(`Invalid maintenanceTask: ${dto.maintenanceTask}`);
    }
    if (dto.issueDescription !== undefined && typeof dto.issueDescription !== 'string') {
      throw new BadRequestException('Invalid issueDescription');
    }
    if (dto.severityLevel !== undefined && 
        !Object.values(PriorityEnum).includes(dto.severityLevel as PriorityEnum)) {
      throw new BadRequestException(`Invalid severityLevel: ${dto.severityLevel}`);
    }
    if (dto.isActionRequired !== undefined && typeof dto.isActionRequired !== 'boolean') {
      throw new BadRequestException('Invalid isActionRequired');
    }
    if (dto.completionStatus !== undefined && 
        !Object.values(StatusEnum).includes(dto.completionStatus as StatusEnum)) {
      throw new BadRequestException(`Invalid completionStatus: ${dto.completionStatus}`);
    }
    if (dto.scheduledCompletionDate !== undefined && 
     !this.isValidDate(dto.scheduledCompletionDate)) {
      throw new BadRequestException('Invalid scheduledCompletionDate');
    }
    // if (dto.reviewers !== undefined) {
    //   if (!Array.isArray(dto.reviewers)) {
    //     throw new BadRequestException('Invalid reviewers: must be an array');
    //   }
    //   if (dto.reviewers.some(reviewer => typeof reviewer !== 'string')) {
    //     throw new BadRequestException('Invalid reviewers: all elements must be strings');
    //   }
    // }
    if (dto.communicationChannel !== undefined && 
        !Object.values(CommunicationChannel).includes(dto.communicationChannel as CommunicationChannel)) {
      throw new BadRequestException(`Invalid communicationChannel: ${dto.communicationChannel}`);
    }
    if (dto.reviewerRemarks !== undefined && typeof dto.reviewerRemarks !== 'string') {
      throw new BadRequestException('Invalid reviewerRemarks');
    }
  }
}