import { Oem } from '../../oems/entities/oem.entity';
import { DefaultEntity } from '../../common/default.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Supplier } from "../../suppliers/entities/supplier.entity";
import { OrderLineItem } from './order-lineitem.entity';
export enum OrderStatus {
  DELAYED = 'DELAYED',
  ONTIME = 'ONTIME',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}

export enum Uom {
  NOS = 'NOS',
  METRES = 'METRES',
  TONNES = 'TONNES',
}

export enum MaterialType{
    ALL='ALL',
    RM='RM',
    SFG='SFG',
    FG='FG',
}
@Entity()
export class Order extends DefaultEntity {

@Column({
    type:'enum',
    enum:MaterialType,
    nullable:true,
    })
    materialType: MaterialType

  @Column({
    type: 'date',
    nullable: true,
  })
  purchaseOrderDate: Date;

  @Column({
    nullable:true
  })
  purchaseOrderNumber:string;
  
  @Column({
    type: 'date',
    nullable: true,
  })
  deliveryDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  actualDeliveryDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  projectedDeliveryDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  billingDate: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.ONTIME,
  })
  status: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  quantity: number;

  @Column({
    type: 'enum',
    enum: Uom,
    default: Uom.TONNES,
  })
  uom: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  lastStatusUpdatedAt: Date;

  @ManyToOne(()=>Supplier, (supplier)=>supplier.order, {nullable:true})
  supplier:any;

  @OneToMany(()=>OrderLineItem, (orderLineItem)=>orderLineItem.order)
  orderLineItem:typeof OrderLineItem[]


  @ManyToOne(() => Oem, (Oem) => Oem.order, {nullable:true})
  oem: any;

  @ManyToOne(()=>Client, (Client)=>Client.order, {nullable:true})
  client:any;
}
