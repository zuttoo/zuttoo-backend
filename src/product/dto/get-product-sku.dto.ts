import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProductType } from "../entities/product.entity";

export class GetSkuDto{

    @IsString()
    @IsOptional()
    clientId:string;

    @IsString()
    @IsOptional()
    productId:string;

}