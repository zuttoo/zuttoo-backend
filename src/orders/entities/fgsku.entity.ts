import { DefaultEntity } from "src/common/default.entity";
import { Oem } from "src/oems/entities/oem.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { FgLineItem } from "./fglineitem.entity";
import { Client } from "src/clients/entities/client.entity";

@Entity()
export class FgSku extends DefaultEntity{

    @Column({nullable:true})
    materialDescription: string;

    @Column({nullable:true})
    materialNumber: string;

    @Column({nullable:true})
    leadTime: number;

    @Column({nullable:true})
    unitPrice: number;

    @Column({nullable:true})
    dimension: string;

    @Column({nullable:true})
    inventory: number;

    @ManyToOne(()=>Oem, (Oem)=>Oem.FgSku, {nullable:true})
    @JoinColumn({name:'oemId'})
    oem: any;
    
    @ManyToOne(()=>Client, (Client)=>Client.fgSku,{nullable:true})
    @JoinColumn({name:'clientId'})
    client: any;

    @OneToMany(()=>FgLineItem, (FgLineItem)=>FgLineItem.fgSku, {nullable:true})
    fgLineItems: FgLineItem[];
}