import { PartialType } from '@nestjs/swagger';
import { CreateSupplychainIssueDto } from './create-supplychain-issue.dto';

export class UpdateSupplyChainIssueDto extends PartialType(CreateSupplychainIssueDto) {
    attachmentsToRemove?: string[]; 
}
