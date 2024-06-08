import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";
import { toNumber } from "./helper/cast.helper";

export class DefaultDto {

    @IsString()
    clientId?: string;
  
    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsInt()
    @IsOptional()
    page?:  number;
  
    @Transform(({ value }) => toNumber(value, { default: 5, min: 1 }))
    @IsInt()
    @IsOptional()
    limit?: number;
  }
  