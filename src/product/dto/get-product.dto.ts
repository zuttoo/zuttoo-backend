import { IsEnum, IsOptional, IsString } from "class-validator";
import { ProductType } from "../entities/product.entity";

export class GetProductDto{

    @IsString()
    @IsOptional()
    clientId:string;

    @IsEnum(ProductType)
    @IsString()
    type:ProductType=ProductType.FG;

}