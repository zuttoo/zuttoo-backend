import { PartialType } from "@nestjs/swagger";
import { CreateQualityAssuranceIssueDto } from "./create-qa-issue.dto";

export class UpdateQualityAssuranceDto extends PartialType(CreateQualityAssuranceIssueDto){
    
}