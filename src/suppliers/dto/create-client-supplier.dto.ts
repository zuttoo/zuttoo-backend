import { DefaultDto } from "src/common/default.dto";
import { CreateAddressDto } from "src/addresses/dto/create-address.dto";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
export class CreateClientSupplierDto{

    @IsString()
    name: string;
  
    @IsOptional()
    @Type(() => CreateAddressDto)
    address?: CreateAddressDto;
  
   
    @IsString()
    clientId: string;
  
    @IsNumber()
    @IsOptional()
    totalDeliveryCount?: number;
  
    @IsNumber()
    @IsOptional()
    perfectDeliveryCount?: number;
  
    @IsNumber()
    @IsOptional()
    turnAroundTimeRm?: number;
  
    @IsNumber()
    @IsOptional()
    productionDisruptionCount?: number;
  
    @IsNumber()
    @IsOptional()
    lostRevenueDisruptionCount?: number;
  
    @IsNumber()
    @IsOptional()
    rating?: number;
  }