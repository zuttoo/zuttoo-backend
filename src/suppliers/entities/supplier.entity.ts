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
  import { Order } from 'src/orders/entities/order.entity';
  import { RmSku } from '../../orders/entities/rmsku.entity';
  import { RmSkuSupplier } from './rmsku-supplier.entity';
  import { SupplyChainIssue } from 'src/supplychain-issue/entities/supplychain-issue.entity';

  
  
  @Entity()
  export class Supplier extends DefaultEntity {
  
    @Column({nullable:true})
    name: string;
  
    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;
  
    @ManyToMany(() => Client, (client) => client.suppliers, {nullable:true})
    @JoinTable()
    clients: Client[];
    
    @Column({nullable:true})
    totalDeliveryCount:number;

    @Column({nullable:true})
    perfectDeliveryCount:number;

    @Column({nullable:true})
    turnAroundTimeRm:number;

    @Column({nullable:true})
    productionDisruptionCount:number;
  
    @Column({nullable:true})
    lostRevenueDisruptionCount:number;
  
    @Column({type:'float', nullable:true})
    rating:number;

    @OneToMany(() => User, (user) => user.supplier, {nullable:true})
    users: User[];
  
    @OneToMany(()=>Order, (order)=>order.supplier, {nullable:true})
    order:Order[];
  
    @OneToMany(()=>RmSku, (rmsku)=>rmsku.supplier, {nullable:true})
    rmskus:RmSku[];

    @OneToMany(()=>SupplyChainIssue, (sci)=>sci.supplier, {nullable:true})
    supplyChainIssues:SupplyChainIssue[];

  }
  