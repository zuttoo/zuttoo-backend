import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested, ValidatePromise } from "class-validator";
import { EquipmentStatusEnum } from "src/common/enums/optimaintain.enum";

export class CreateSparePartDto{
    @IsString()
    name:string;

    @IsOptional()
    @IsNumber()
    count?:number;
}

export class CreateComponentDto{
    @IsString()
    name:string;

    @ValidateNested({each:true})
    @Type(()=>CreateSparePartDto)
    spareParts:CreateSparePartDto[]
}

export class CreateEquipmentDto {
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    identificationNumber?: string;
  
    @IsOptional()
    @IsString()
    maker?: string;
  
    @IsOptional()
    @IsDate()
    installationDate?: Date;
  
    @IsOptional()
    @IsDate()
    lastBreakdownDate?: Date;
  
    @IsOptional()
    @IsDate()
    lastDailyManagementDate?: Date;
  
    @IsOptional()
    @IsDate()
    lastPreventiveMaintenanceDate?: Date;
  
    @IsOptional()
    @IsDate()
    nextPreventiveMaintenanceDate?: Date;
  
    @IsOptional()
    @IsBoolean()
    isPredictiveMaintenanceDone?: boolean;
  
    @IsOptional()
    @IsBoolean()
    isSensorInstalled?: boolean;
  
    @IsOptional()
    @IsNumber()
    healthPercentage?: number;
  
    @IsOptional()
    @IsEnum(EquipmentStatusEnum)
    status?: EquipmentStatusEnum;
  
    @ValidateNested({ each: true })
    @Type(() => CreateComponentDto)
    components: CreateComponentDto[];
  }
export class CreateSectionDto{
    @IsString()
    name:string;

    @ValidateNested({each:true})
    @Type(()=>CreateEquipmentDto)
    equipments:CreateEquipmentDto[];


}

export class CreateProcessLineDto{
    @IsString()
    name:string;

    @ValidateNested({each:true})
    @Type(()=>CreateSectionDto)
    sections:CreateSectionDto[];
}