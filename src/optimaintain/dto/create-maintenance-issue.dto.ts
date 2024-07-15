import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { DefaultDto } from "src/common/default.dto";
import { CommunicationChannel, PriorityEnum, StatusEnum } from "src/common/enums/common.enum";
import { MaintenanceTask, ShiftEnum, WorkstationEnum } from "src/common/enums/optimaintain.enum";

export class CreateIssueDto extends DefaultDto{

    @IsString()
    @IsNotEmpty()
    clientId?: string;

    @IsString()
    @IsNotEmpty()
    issueId:string;

    @Type(()=>Date)
    @IsDate()
    issueDate:Date;

    @IsEnum(WorkstationEnum)
    @IsOptional()
    workstation:string;

    @IsEnum(ShiftEnum)
    @IsString()
    shift:string;

    @IsEnum(MaintenanceTask)
    @IsString()
    maintenanceTask:string;

    @IsString()
    @IsOptional()
    issueDescription:string;

    @IsEnum(PriorityEnum)
    @IsOptional()
    severityLevel:string;

    @IsBoolean()
    isActionRequired:boolean;

    @IsEnum(StatusEnum)
    completionStatus:string;

    @Type(()=>Date)
    @IsDate()   
    scheduledCompletionDate:Date;

    // @IsArray()
    // @IsOptional()
    // reviewers:string[];

    @IsEnum(CommunicationChannel)
    communicationChannel:string;
    
    @IsString()
    reviewerRemarks:string;
}