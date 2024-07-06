import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, ValidateNested, ValidatePromise } from "class-validator";
import { DefaultDto } from "src/common/default.dto";
import { EquipmentStatusEnum } from "src/common/enums/optimaintain.enum";

export class CreateSparePartDto extends DefaultDto{

    @IsString()
    name:string;

    @IsOptional()
    @IsNumber()
    count?:number;
}

export class CreateComponentDto extends DefaultDto{
 

    @IsString()
    name:string;

    @ValidateNested({each:true})
    @Type(()=>CreateSparePartDto)
    spareParts:CreateSparePartDto[]
}

export class CreateEquipmentDto extends DefaultDto{

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
export class CreateSectionDto extends DefaultDto{

    @IsString()
    name:string;

    @ValidateNested({each:true})
    @Type(()=>CreateEquipmentDto)
    equipments:CreateEquipmentDto[];
  id: any;

}

export class CreateProcessLineDto extends DefaultDto{

    @IsString()
    name:string;

    @ValidateNested({each:true})
    @Type(()=>CreateSectionDto)
    sections:CreateSectionDto[];
}