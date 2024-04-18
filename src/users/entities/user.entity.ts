// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Oem } from '../../oems/entities/oem.entity';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Manager = 'Manager',
  SuperAdmin = 'SuperAdmin',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, { nullable: true })
  @JoinColumn()
  client: Client;

  @ManyToOne(() => Supplier, { nullable: true })
  @JoinColumn()
  supplier: Supplier;

  @ManyToOne(() => Oem, { nullable: true })
  @JoinColumn()
  oem: Oem;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  contactNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;
}
