import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PriorityEnum, StatusEnum} from "src/common/enums/common.enum";
import { SupplyChainIssueCategoryEnum, SupplyChainIssueDescriptionEnum, SupplyChainSubIssueEnum } from "src/common/enums/supplychain.enum";
export class CreateSupplychainIssueDto {

    @IsString()
    @IsOptional()
    clientId:string;

    
    @IsString()
    @IsOptional()
    issueId:string;

    @IsString()
    @IsOptional()
    title:string;

    @IsString()
    @IsOptional()
    materialNumber:string;

    @IsString()
    @IsOptional()
    purchaseOrderNumber:string;

    @IsString()
    @IsOptional()
    vehicleNumber:string;
    @IsString()
    @IsOptional()
    deliveryOrderNumber:string;

    @IsEnum(SupplyChainIssueCategoryEnum)
    @IsOptional()
    category:string;

    @IsEnum(SupplyChainIssueDescriptionEnum)
    @IsOptional()
    description:string;

    @IsEnum(SupplyChainSubIssueEnum)
    @IsOptional()
    subIssue:string;

    @IsEnum(PriorityEnum)
    @IsOptional()
    priority:string;

    @IsEnum(StatusEnum)
    @IsOptional()
    status:string;

    @IsString()
    @IsOptional()
    supplierId:string;

    @IsOptional()
    // @IsArray()
    attachments?:Express.Multer.File[];

}
