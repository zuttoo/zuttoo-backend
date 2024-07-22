import { PartialType } from "@nestjs/swagger";
import { CreateClientSupplierDto } from "./create-client-supplier.dto";

export class UpdateClientSupplierDto extends PartialType(CreateClientSupplierDto){
    
}