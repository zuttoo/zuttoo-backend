import { DefaultEntity } from "src/common/default.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import {Order} from './order.entity'
import { FgSku } from "./fgsku.entity";
import { FgSkuStage } from "./fgskustage.entity";
import { RmSku } from "./rmsku.entity";
import { RmSkuStage } from "./rmskustage.entity";

@Entity()
export class OrderLineItem extends DefaultEntity{
    @Column({
       
        nullable:true
    })
    batchNumber:string;

    @Column({
        nullable:true
    })
    billingId:string;

    @Column({
        type:'float',
        nullable:true
    })
    price:number;

    @Column({
        type:'integer',
        nullable:true,
    })
    quantityNos:number;

    @Column({
        type:'float',
        nullable:true
    })
    quantityMtrs:number;

    @Column({
        type:'float',
        nullable:true,
    })
    quantityTonnage:number;

    @ManyToOne(()=>Order, (order)=>order.orderLineItem, {nullable:true})
    order: any;

    @ManyToOne(()=>FgSku, (FgSku)=>FgSku.fgLineItems, {nullable:true})
    fgSku:typeof FgSku;  

    @OneToOne(()=>FgSkuStage,{nullable:true})
    @JoinColumn()
    fgskustage:FgSkuStage[];

  

    @ManyToOne(()=>RmSku, (rmsku)=>rmsku.rmLineItems, {nullable:true})
    rmsku: typeof RmSku;    

    @OneToOne(()=>RmSkuStage, {nullable:true})
    @JoinColumn()
    rmskustage:RmSkuStage;
}   

    
