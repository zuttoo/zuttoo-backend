import { DefaultEntity } from "src/common/default.entity";
import { Oem } from "src/oems/entities/oem.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Client } from "src/clients/entities/client.entity";
import { OrderLineItem } from "./order-lineitem.entity";
import { Product } from "../../product/entities/product.entity";

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
    oem: Oem[];
    
    @ManyToOne(()=>Client, (Client)=>Client.fgSku,{nullable:true})
    @JoinColumn({name:'clientId'})
    client: Client[];

    @ManyToOne(()=>OrderLineItem, (orderLineItem)=>orderLineItem.fgSku, {nullable:true})
    orderLineItems: OrderLineItem[];

    @ManyToOne(()=>Product, (product)=>product.fgsku, {nullable:true})
    product: Product[];

    @OneToMany(()=>FgSku, (fgsku)=>fgsku.sfgsku)
    sfgsku:FgSku[];
}