import { PartialType } from '@nestjs/swagger';
import { CreateOptimaintainDto } from './create-optimaintain.dto';

export class UpdateOptimaintainDto extends PartialType(CreateOptimaintainDto) {}
