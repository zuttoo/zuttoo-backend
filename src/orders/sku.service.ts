import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RmSku } from "./entities/rmsku.entity";
import { Repository } from "typeorm";
import { FgSku } from "./entities/fgsku.entity";
import { SFGSku } from "./entities/sfgsku.entity";

@Injectable()
export class SkuService{
    constructor(@InjectRepository(RmSku) private readonly rmskuRepository:Repository<RmSku>,
    @InjectRepository(FgSku) private readonly fgskuRepository:Repository<FgSku>,
    @InjectRepository(SFGSku) private readonly sfgskuRepository:Repository<SFGSku>,
   
)
{}

    async getRmBySku(materialDescription:string, clientId):Promise<any>{
        if(!materialDescription || clientId){
            throw new BadRequestException("Material Description or client id is not present.");
        }

        const rmsku=await this.rmskuRepository.find({
            where:{
                client:clientId,
                materialDescription:materialDescription
            }     
        });

        return rmsku;
    }

    async getFgBySku(materialDescription:string,materialNumber:string,clientId):Promise<any>{
        if(!materialDescription || clientId){
            throw new BadRequestException("Material Description or ClientId not present")
        }

        const fgsku=await this.fgskuRepository.find({
            where:{
                client:clientId,
                materialNumber:materialNumber,
                materialDescription:materialDescription

            }
        })

        return fgsku;
    }

    async getSfgBySku(materialDescription:string, clientId):Promise<any>{
        if(!materialDescription || clientId){
            throw new BadRequestException("Material Description or ClientId not present")
        }

        const sfgsku=await this.sfgskuRepository.find({
            where:{
                client:clientId,
                materialDescription:materialDescription

            }
        })

        return sfgsku;
    }
}