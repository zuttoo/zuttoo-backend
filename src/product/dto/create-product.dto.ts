import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { Product, ProductType } from "../entities/product.entity";
import { Type } from "class-transformer";

export class CreateProductDto {

    @IsString()
    name:string;

    @IsEnum(ProductType)
    type:ProductType;

    @IsString()
    @IsOptional()
    clientId?:string;

    @IsArray()
    skus:string[];
}
