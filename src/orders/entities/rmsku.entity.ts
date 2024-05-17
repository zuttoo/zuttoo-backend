import { Client } from "src/clients/entities/client.entity";
import { DefaultEntity } from "src/common/default.entity";
import { Supplier } from "src/suppliers/entities/supplier.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { RmLineItem } from "./rmlineitems.entity";

@Entity()
export class RmSku extends DefaultEntity{

    @ManyToOne(() => Client, (client)=>client.rmskus, {nullable:true})
    @JoinColumn({ name: 'clientId' })
    client: typeof Client;

    @ManyToOne(() => Supplier)
    @JoinColumn({ name: 'supplierId' })
    supplier: typeof Supplier;

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

    @OneToMany(()=>RmLineItem, (rmlineitem)=>RmLineItem.rmsku)
    rmLineItems: RmLineItem[];



}