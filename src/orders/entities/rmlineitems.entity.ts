import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { FgLineItem } from "./fglineitem.entity";
import { RmOrder } from "./rmorder.entity";
import { RmSku } from "./rmsku.entity";
import { RmSkuStage } from "./rmskustage.entity";
@Entity()
export class RmLineItem extends FgLineItem{

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

    @ManyToOne(()=>RmOrder, (rmorder)=>rmorder.rmlineItems)
    rmorder:typeof RmOrder;

    @ManyToOne(()=>RmSku, (rmsku)=>rmsku.rmLineItems)
    rmsku: typeof RmSku;    

    @OneToOne(()=>RmSkuStage)
    @JoinColumn()
    rmskustage:RmSkuStage;
}