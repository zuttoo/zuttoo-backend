import { IsOptional, IsString, IsDate, IsNumber, IsEnum } from 'class-validator';
import { DefectTypeEnum, DefectSeverityEnum } from '../../common/enums/quality-assurance.enum';

export class CreateQualityAssuranceIssueDto {
    @IsOptional()
    @IsString()
    batchId?: string;

    @IsOptional()
    @IsString()
    productCode?: string;

    @IsOptional()
    @IsDate()
    startDateTime?: Date;

    @IsOptional()
    @IsDate()
    endDateTime?: Date;

    @IsOptional()
    @IsString()
    tubeMaterial?: string;

    @IsOptional()
    @IsString()
    tubeDimension?: string;

    @IsOptional()
    @IsString()
    tubeSupplier?: string;

    @IsOptional()
    @IsString()
    tubeLot?: string;

    @IsOptional()
    @IsNumber()
    axialFeedRate?: number;

    @IsOptional()
    @IsNumber()
    hydraulicPressure?: number;

    @IsOptional()
    @IsEnum(DefectTypeEnum)
    defectType?: DefectTypeEnum;

    @IsOptional()
    @IsEnum(DefectSeverityEnum)
    severityType?: DefectSeverityEnum;

    @IsOptional()
    @IsNumber()
    totalParts?: number;

    @IsOptional()
    @IsNumber()
    acceptedParts?: number;

    @IsOptional()
    @IsNumber()
    defectQuantity?: number;

    @IsOptional()
    @IsNumber()
    defectRate?: number;
}