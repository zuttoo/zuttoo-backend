import { Column, Entity, ManyToOne } from "typeorm";
import { FgLineItem } from "./fglineitem.entity";
import { RmOrder } from "./rmorder.entity";
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

}