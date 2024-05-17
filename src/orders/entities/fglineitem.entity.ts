import { DefaultEntity } from "src/common/default.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { FgOrder } from "./fgorder.entity";
import { FgSku } from "./fgsku.entity";
import { FgSkuStage } from "./fgskustage.entity";

@Entity()
export class FgLineItem extends DefaultEntity{
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

    @ManyToOne(()=>FgOrder, (FgOrder)=>FgOrder.fgLineItems, {nullable:true})
    // fgOrder: any;
    fgOrder: FgOrder[]

    @ManyToOne(()=>FgSku, (FgSku)=>FgSku.fgLineItems, {nullable:true})
    fgSku:FgSku[];  

    @OneToOne(()=>FgSkuStage, (fgskustage)=>fgskustage.fgLineItem)
    @JoinColumn()
    fgskustage:FgSkuStage[];
}   

    
