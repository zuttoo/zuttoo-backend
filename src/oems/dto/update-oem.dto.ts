import { PartialType } from '@nestjs/swagger';
import { CreateOemDto } from './create-oem.dto';

export class UpdateOemDto extends PartialType(CreateOemDto) {}
