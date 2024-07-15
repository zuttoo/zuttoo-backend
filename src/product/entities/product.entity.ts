import { Client } from "src/clients/entities/client.entity";
import { DefaultEntity } from "src/common/default.entity";
import { FgSku } from "src/orders/entities/fgsku.entity";
import { RmSku } from "src/orders/entities/rmsku.entity";
import { SFGSku } from "src/orders/entities/sfgsku.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

export enum ProductType{
    FG='FG',
    SFG='SFG',
    RM='RM'
}
@Entity()
export class Product extends DefaultEntity{
    @Column({
        nullable:true
    })
    name: string;

    @Column({
        type:'enum',
        nullable:true,
        enum:ProductType,
        
    })
    type:typeof ProductType;

    @ManyToOne(()=>Client, (client)=>client.product,{nullable:true})
    client:Client[];

    @OneToMany(()=>FgSku, (fgsku)=>fgsku.product, {nullable:true})
    fgsku: FgSku[];

    @OneToMany(()=>SFGSku, (sfgsku)=>sfgsku.product, {nullable:true})
    sfgsku:SFGSku[];
    
    @OneToMany(()=>RmSku, (rmsku)=>rmsku.product,{nullable:true})
    rmsku:RmSku[];
}
