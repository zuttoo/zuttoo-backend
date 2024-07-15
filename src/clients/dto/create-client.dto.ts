import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateClientDto {

    @IsString()
    name:string;

    @IsString()
    @IsOptional()
    contactPerson?:string;

    @IsString()
    @IsOptional()
    contactNumber?:string;

    @IsString()
    @IsOptional()
    contactEmail?:string;

    @IsDate()
    @IsOptional()
    subscriptionValidity?:Date;

    @IsString()
    address:string;

    @IsString()
    city:string;

    @IsString()
    state:string;

    @IsString()
    @IsOptional()
    postalCode?:string

    @IsString()
    @IsOptional()
    country:string;



}
