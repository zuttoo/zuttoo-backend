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
} from 'typeorm';
import { DefaultEntity } from '../../common/default.entity';
import { Address } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import {RmOrder} from '../../orders/entities/rmorder.entity'

@Entity()
export class Supplier extends DefaultEntity {


  @Column()
  name: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Client, (client) => client.suppliers)
  @JoinTable()
  clients: Client[];

  @OneToMany(() => User, (user) => user.supplier)
  users: User[];

  @OneToMany(()=>RmOrder, (rmorder)=>rmorder.supplier)
  rmOrders:RmOrder[];


}
