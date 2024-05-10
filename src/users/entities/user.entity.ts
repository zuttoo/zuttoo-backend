// eslint-disable-next-line prettier/prettier
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Oem } from '../../oems/entities/oem.entity';
import { DefaultEntity } from '../../common/default.entity';
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MANAGER = 'MANAGER',
  SUPERADMIN = 'SUPERADMIN',
}

@Entity()
export class User extends DefaultEntity {
 

  @ManyToOne(() => Client, { nullable: true })
  @JoinColumn()
  client: string;

  @ManyToOne(() => Supplier, { nullable: true })
  @JoinColumn()
  supplier: string;

  @ManyToOne(() => Oem, { nullable: true })
  @JoinColumn()
  oem: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contactNumber: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: string;
}
