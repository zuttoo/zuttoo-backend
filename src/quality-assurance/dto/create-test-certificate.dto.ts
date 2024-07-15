import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateTestCertificateDto{
    @IsString()
    @IsOptional()
    invoiceNumber?:string;

    @IsString()
    @IsOptional()
    tcNumber?:string;

    @IsString()
    @IsOptional()
    materialDescription?:string;

    
    @IsOptional()
    @IsArray()
    attachments?:Express.Multer.File[];

}