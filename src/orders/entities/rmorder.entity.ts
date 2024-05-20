import {Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { FgOrder } from "./fgorder.entity";
import { Supplier } from "../../suppliers/entities/supplier.entity";
import { RmLineItem } from "./rmlineitems.entity";

@Entity()
export class RmOrder extends FgOrder{
  
    @ManyToOne(()=>Supplier, (supplier)=>supplier.rmOrders, {nullable:true})
    supplier:any;

    @OneToMany(()=>RmLineItem,(rmlineitem)=>rmlineitem.rmorder)
    @JoinColumn()
    rmlineItems:typeof RmLineItem[];
}