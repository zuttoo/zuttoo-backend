import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RmSku } from "./entities/rmsku.entity";
import { Repository } from "typeorm";

@Injectable()
export class SkuService{
    constructor(@InjectRepository(RmSku) private readonly rmskuRepository:Repository<RmSku>){}

    async getRmBySku(materialDescription:string, clientId:string):Promise<any>{
        if(!materialDescription || clientId){
            throw new BadRequestException("Material Description or client id is not present.");
        }

        const rmsku=await this.rmskuRepository.find({
            where:{
                clientId:clientId,
                materialDescription:materialDescription
            }     
        });

        return rmsku;
    }
}