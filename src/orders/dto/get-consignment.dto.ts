import { IsOptional, IsString } from "class-validator";
import { DefaultDto } from "src/common/default.dto";

export class GetConsignmentDto extends DefaultDto{

    @IsString()
    @IsOptional()
    orderId:string;
}