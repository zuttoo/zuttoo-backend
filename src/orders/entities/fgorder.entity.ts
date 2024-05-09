import { string } from 'joi';
import { Oem } from '../../oems/entities/oem.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  DELAYED = 'DEALYED',
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
export class FgOrder extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    type: 'timestamp with time zone',
    nullable: true,
  })
  lastStatusUpdatedAt: Date;

  @ManyToOne(() => Oem, (Oem) => Oem.id)
  oem: Oem;
}
