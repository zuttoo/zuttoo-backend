import {
  Entity,
  Column,
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
import { FgOrder } from '../../orders/entities/fgorder.entity';
import { FgSku } from 'src/orders/entities/fgsku.entity';
import { RmSku } from 'src/orders/entities/rmsku.entity';
@Entity()
export class Client extends DefaultEntity {

  @Column()
  name: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToMany(() => Supplier, (supplier) => supplier.clients, {nullable:true})
  suppliers: Supplier[];

  @ManyToMany(() => Oem, (oem) => oem.clients, {nullable:true})
  oems:Oem[];

  @OneToMany(() => User, (user) => user.client, {nullable:true})
  users: User[];

  @OneToMany(()=>FgOrder, (FgOrder)=>FgOrder.client, {nullable:true})
  fgOrder: FgOrder[];

  @OneToMany(()=>FgSku, (FgSku)=>FgSku.client, {nullable:true})
  fgSku:FgSku[];

  
  @OneToMany(()=>RmSku, (RmSku)=>RmSku.client, {nullable:true})
  rmskus:RmSku[];
}
