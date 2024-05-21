import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { toNumber } from "../../common/helper/cast.helper";
import { Transform } from "class-transformer";
export class GetOrderDto {

  @IsString()
  @IsOptional()
  clientId?: string;

  @IsEnum({
    ALL: 'ALL',
    RM: 'RM',
    SFG: 'SFG',
    FG: 'FG',
  })
  @IsOptional()
  materialType?: string;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsInt()
  @IsOptional()
  page?:  number;

  @Transform(({ value }) => toNumber(value, { default: 5, min: 1 }))
  @IsInt()
  @IsOptional()
  limit?: number;
}
