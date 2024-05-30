import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum PriorityEnum{
    TIMELINE='TIMELINE',
    QUALITY='QUALITY',
    COST='COST',
    NO_PRIORITY='NO_PRIORITY'
}

export enum Uom {
    NOS = 'NOS',
    METRES = 'METRES',
    TONNES = 'TONNES',
}

export class SelectSupplierDto {

    @IsString()
    @IsNotEmpty()
    productName:string;

    @IsString()
    @IsNotEmpty()
    productSku:string;

    @IsNotEmpty()
    @IsNumber()
    quantity:number;

    @IsEnum(Uom)
    @IsString()
    @IsNotEmpty()
    uom:string;

    @IsEnum(PriorityEnum)
    @IsString()
    priority?:string;

    @IsDateString()
    expectedDeliveryDate:Date;

}
