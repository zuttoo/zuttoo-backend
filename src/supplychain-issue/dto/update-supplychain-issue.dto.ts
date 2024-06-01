import { PartialType } from '@nestjs/swagger';
import { CreateSupplychainIssueDto } from './create-supplychain-issue.dto';

export class UpdateSupplychainIssueDto extends PartialType(CreateSupplychainIssueDto) {}
