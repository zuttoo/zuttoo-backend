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
import { FgSku } from 'src/orders/entities/fgsku.entity';
import { RmSku } from 'src/orders/entities/rmsku.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { SupplyChainIssue, SupplychainIssue } from 'src/supplychain-issue/entities/supplychain-issue.entity';
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

  @OneToMany(()=>Order, (order)=>order.client, {nullable:true})
  order: Order[];

  @OneToMany(()=>FgSku, (FgSku)=>FgSku.client, {nullable:true})
  fgSku:FgSku[];

  
  @OneToMany(()=>RmSku, (RmSku)=>RmSku.client, {nullable:true})
  rmskus:RmSku[];

  @OneToMany(()=>Product, (product)=>product.client, {nullable:true})
  product:Product[];

  @OneToMany(()=>SupplyChainIssue, (sci)=>sci.client, {nullable:true})
  supplyChainIssues: SupplyChainIssue[];

}
