import { Client } from "src/clients/entities/client.entity";
import { DefaultEntity } from "src/common/default.entity";
import { Supplier } from "src/suppliers/entities/supplier.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { OrderLineItem } from "./order-lineitem.entity";

@Entity()
export class RmSku extends DefaultEntity{

    @ManyToOne(() => Client, (client)=>client.rmskus, {nullable:true})
    @JoinColumn({ name: 'clientId' })
    client: typeof Client;

    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplierId' })
    supplier: typeof Supplier;

    @Column({nullable:true})
    product:string;

    @Column({nullable:true})
    materialDescription:string;

    @Column({nullable:true})
    materialGrade:string;

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

    @ManyToOne(()=>OrderLineItem, (orderLineItem)=>orderLineItem.rmsku, {nullable:true})
    rmLineItems: OrderLineItem[];

}