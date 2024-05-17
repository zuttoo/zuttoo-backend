import { Oem } from '../../oems/entities/oem.entity';
import { DefaultEntity } from '../../common/default.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { FgLineItem } from './fglineitem.entity';
export enum OrderStatus {
  DELAYED = 'DELAYED',
  ONTIME = 'ONTIME',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
}

export enum Uom {
  NOS = 'NOS',
  METERS = 'METERS',
  TONNES = 'TONNES',
}
@Entity()
export class FgOrder extends DefaultEntity {


  @Column({
    type: 'date',
    nullable: true,
  })
  purchaseOrderDate: Date;

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
  quanitity: number;

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

  @ManyToOne(() => Oem, (Oem) => Oem.fgOrder, {nullable:true})
  oem: any;

  @ManyToOne(()=>Client, (Client)=>Client.fgOrder, {nullable:true})
  client:any;

  @OneToMany(()=>FgLineItem, (FgLineItem)=>FgLineItem.fgOrder, {nullable:true})
  fgLineItems:any;

}
