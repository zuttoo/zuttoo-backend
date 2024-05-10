import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { DefaultEntity } from '../../common/default.entity';
import { Address } from '../../addresses/entities/address.entity';
import { User } from '../../users/entities/user.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Oem } from '../../oems/entities/oem.entity';
@Entity()
export class Client extends DefaultEntity {

  @Column()
  name: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Supplier, (supplier) => supplier.clients)
  suppliers: Supplier[];

  @ManyToMany(() => Oem, (oem) => oem.clients)
  oems: Oem[];

  @OneToMany(() => User, (user) => user.client)
  users: User[];
}
