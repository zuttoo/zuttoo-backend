import { PartialType } from "@nestjs/swagger";
import { CreateProcessLineDto } from "./create-process-line.dto";

export class UpdateProcessLineDto extends PartialType(CreateProcessLineDto){
    
}