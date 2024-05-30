import { Client } from "src/clients/entities/client.entity";
import { DefaultEntity } from "src/common/default.entity";
import { FgSku } from "src/orders/entities/fgsku.entity";
import { SFGSku } from "src/orders/entities/sfgsku.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Product extends DefaultEntity{
    @Column({
        nullable:true
    })
    name: string;

    @ManyToOne(()=>Client, (client)=>client.product,{nullable:true})
    client:Client[];

    @OneToMany(()=>FgSku, (fgsku)=>fgsku.product, {nullable:true})
    fgsku: FgSku[];

    @OneToMany(()=>SFGSku, (sfgsku)=>sfgsku.product, {nullable:true})
    sfgsku:SFGSku[];

}
