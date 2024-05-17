// eslint-disable-next-line prettier/prettier
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Relation,
} from 'typeorm';
import { DefaultEntity } from '../../common/default.entity';
import { Address } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import { FgOrder } from '../../orders/entities/fgorder.entity';
import { FgSku } from 'src/orders/entities/fgsku.entity';
@Entity()
export class Oem extends DefaultEntity {

  @Column()
  name: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Client, (client) => client.oems)
  @JoinTable()
  clients: any;

  @OneToMany(() => User, (user)=>user.oem)
  users: User[];

  @OneToMany(() => FgOrder, (fgorder) => fgorder.oem)
  fgOrder: FgOrder[];

  @OneToMany(()=>FgSku, (fgsku)=>fgsku.oem )
  FgSku: FgSku[];
}
