import { Client } from 'src/clients/entities/client.entity';
import { DefaultEntity } from '../../common/default.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Address extends DefaultEntity {


  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({
    nullable:true
  })
  postalCode: string;

  @Column()
  country: string;

  @OneToOne(() => Client, (client)=>client.address)
  @JoinColumn()
  client: typeof Client;


}
