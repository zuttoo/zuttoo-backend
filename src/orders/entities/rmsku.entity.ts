import { Client } from "src/clients/entities/client.entity";
import { DefaultEntity } from "src/common/default.entity";
import { Supplier } from "../../suppliers/entities/supplier.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { OrderLineItem } from "./order-lineitem.entity";
import { SFGSku } from "./sfgsku.entity";
import { RmSkuSupplier } from "src/suppliers/entities/rmsku-supplier.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class RmSku extends DefaultEntity{

    @ManyToOne(() => Client, (client)=>client.rmskus, {nullable:true})
    @JoinColumn({ name: 'clientId' })
    client: Client[];


    @ManyToOne(()=>Product, (product)=>product.rmsku, {nullable:true})
    product:Product[];

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

    @Column({nullable:true})
    rmRequiredQty:number;

    @ManyToOne(()=>OrderLineItem, (orderLineItem)=>orderLineItem.rmsku, {nullable:true})
    orderLineItems: OrderLineItem[];

    @ManyToOne(()=>SFGSku, (sfgsku)=>sfgsku.rmsku, {nullable:true})
    sfgsku:SFGSku[];
    
    // @ManyToMany(() => Supplier,(supplier)=>supplier.rmskus, {nullable:true
    // })
    // @JoinColumn()
    // suppliers: Supplier[];

    @ManyToMany(()=>Supplier, supplier=>supplier.supplierRmSkus)
    @JoinTable({
        name:'rmsku_supplier',
        joinColumn:{
            name:'rmskuId',
            referencedColumnName:'id',
        },
        inverseJoinColumn:{
            name:'supplierId',
            referencedColumnName:'id',
        },
    })
    rmskuSuppliers:RmSkuSupplier[]



}