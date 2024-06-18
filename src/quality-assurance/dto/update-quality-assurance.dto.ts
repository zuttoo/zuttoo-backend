import { PartialType } from '@nestjs/swagger';
import { CreateQualityAssuranceDto } from './create-quality-assurance.dto';

export class UpdateQualityAssuranceDto extends PartialType(CreateQualityAssuranceDto) {}
