import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { MaintenanceIssue } from './entities/maintenance-issue.entity';
import { CreateIssueDto } from './dto/create-maintenance-issue.dto';
import { PriorityEnum, StatusEnum,CommunicationChannel} from 'src/common/enums/common.enum';
import { WorkstationEnum, ShiftEnum, MaintenanceTask } from 'src/common/enums/optimaintain.enum';
import { ProcessLine } from './entities/process-line.entity';
import { Section } from './entities/section.entity';
import { Equipment } from './entities/equipment.entity';
import { SparePart } from './entities/spare-part.entity';
import { Component } from './entities/component.entity';
import { CreateProcessLineDto } from './dto/create-process-line.dto';
import { UpdateProcessLineDto } from './dto/update-process-line.dto';


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

  async  updateProcessLine(id:string, updateProcessLineDto:UpdateProcessLineDto):Promise<any>{
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the existing ProcessLine
      const processLine = await this.processLineRepository.findOne({ where: { id } as FindOptionsWhere<ProcessLine> });
      if (!processLine) {
        throw new NotFoundException(`Process line with ID "${id}" not found`);
      }

      // Update ProcessLine
      processLine.name = updateProcessLineDto.name || processLine.name;
      await queryRunner.manager.save(processLine);

      // Update Sections
      if (updateProcessLineDto.sections) {
        const existingSections = await this.sectionRepository.find({ where: { processLine: { id: processLine.id } } });
        const updatedSectionIds = updateProcessLineDto.sections?.map(s => s.id).filter(id => id);
        
        // Remove sections not in the update DTO
        for (const section of existingSections) {
          if (!updatedSectionIds.includes(section.id)) {
            await queryRunner.manager.remove(section);
          }
        }

        // Update or create sections
        for (const sectionDto of updateProcessLineDto.sections) {
          let section = sectionDto.id 
            ? await this.sectionRepository.findOne({ where: { id: sectionDto.id } as FindOptionsWhere<Section> })
            : this.sectionRepository.create();

          section.name = sectionDto.name;
          // section.processLine = processLine;
          section = await queryRunner.manager.save(section);

          // Update Equipment
          if (sectionDto.equipments) {
            const existingEquipment = await this.equipmentRepository.find({ where: { section: { id: section.id } } });
            const updatedEquipmentIds = sectionDto.equipments.map(e => e.id).filter(id => id);

            // Remove equipment not in the update DTO
            for (const equipment of existingEquipment) {
              if (!updatedEquipmentIds.includes(equipment.id)) {
                await queryRunner.manager.remove(equipment);
              }
            }

            // Update or create equipment
            for (const equipmentDto of sectionDto.equipments) {
              let equipment = equipmentDto.id
                ? await this.equipmentRepository.findOne({ where: { id: equipmentDto.id } as FindOptionsWhere<Equipment> })
                : this.equipmentRepository.create();

              Object.assign(equipment, equipmentDto);
              equipment.section = section;
              equipment = await queryRunner.manager.save(equipment);

              // Update Components
              if (equipmentDto.components) {
                const existingComponents = await this.componentRepository.find({ where: { equipment: { id: equipment.id } } });
                const updatedComponentIds = equipmentDto.components.map(c => c.id).filter(id => id);

                // Remove components not in the update DTO
                for (const component of existingComponents) {
                  if (!updatedComponentIds.includes(component.id)) {
                    await queryRunner.manager.remove(component);
                  }
                }

                // Update or create components
                for (const componentDto of equipmentDto.components) {
                  let component = componentDto.id
                    ? await this.componentRepository.findOne({ where: { id: componentDto.id } as FindOptionsWhere<Component> })
                    : this.componentRepository.create();

                  component.name = componentDto.name;
                  component.equipment = equipment;
                  component = await queryRunner.manager.save(component);

                  // Update Spare Parts
                  if (componentDto.spareParts) {
                    const existingSpareParts = await this.sparePartRepository.find({ where: { component: { id: component.id } } });
                    const updatedSparePartIds = componentDto.spareParts.map(sp => sp.id).filter(id => id);

                    // Remove spare parts not in the update DTO
                    for (const sparePart of existingSpareParts) {
                      if (!updatedSparePartIds.includes(sparePart.id)) {
                        await queryRunner.manager.remove(sparePart);
                      }
                    }

                    // Update or create spare parts
                    for (const sparePartDto of componentDto.spareParts) {
                      let sparePart = sparePartDto.id
                        ? await this.sparePartRepository.findOne({ where: { id: sparePartDto.id } as FindOptionsWhere<SparePart> })
                        : this.sparePartRepository.create();

                      Object.assign(sparePart, sparePartDto);
                      sparePart.component = component;
                      await queryRunner.manager.save(sparePart);
                    }
                  }
                }
              }
            }
          }
        }
      }

      await queryRunner.commitTransaction();

      // Fetch and return the updated ProcessLine with all nested entities
      const updatedProcessLine = await this.processLineRepository.findOne({
        where: { id } as FindOptionsWhere<ProcessLine>,
        relations: ['sections', 'sections.equipment', 'sections.equipment.components', 'sections.equipment.components.spareParts'],
      });

      return updatedProcessLine;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to update process line');
    } finally {
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