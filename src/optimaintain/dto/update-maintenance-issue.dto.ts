import { PartialType } from "@nestjs/swagger";
import { CreateIssueDto } from "./create-maintenance-issue.dto";

export class UpdateIssueDto extends PartialType(CreateIssueDto){
    
}