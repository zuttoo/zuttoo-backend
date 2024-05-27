import { Client } from "src/clients/entities/client.entity";
import { DefaultEntity } from "src/common/default.entity";
import { Product } from "src/product/entities/product.entity";
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { RmSku } from "./rmsku.entity";
import { FgSku } from "./fgsku.entity";

@Entity()
export class SFGSku extends DefaultEntity{

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

    @ManyToOne(()=>Client, (Client)=>Client.fgSku,{nullable:true})
    @JoinColumn({name:'clientId'})
    client: Client[];

    @ManyToOne(()=>Product, (product)=>product.sfgsku, {nullable:true})
    product:Product[];

    @OneToMany(()=>RmSku, (rmsku)=>rmsku.sfgsku)
    rmsku: RmSku[];

    @ManyToOne(()=>FgSku, (fgsku)=>fgsku.sfgsku)
    fgsku:FgSku[];

}