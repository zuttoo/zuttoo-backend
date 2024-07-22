import { IsOptional, IsString } from "class-validator";
import { DefaultDto } from "src/common/default.dto";

export class CreateAddressDto{
    @IsString()
    address:string;

    @IsString()
    city:string;

    @IsString()
    state:string;

    @IsString()
    @IsOptional()
    postalCode?:string;

    @IsString()
    @IsOptional()
    country:string;


}
