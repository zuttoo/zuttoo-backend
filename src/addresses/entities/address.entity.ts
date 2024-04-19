import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity()
export class Address extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string;

    @Column()
    address1:string;

    @Column()
    city:string;

    @Column()
    state:string;

    @Column()
    country:string;

    @Column()
    postalCode:number
    

}