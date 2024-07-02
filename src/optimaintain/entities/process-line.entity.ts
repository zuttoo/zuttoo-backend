import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Section } from "./section.entity";
import { Client } from "src/clients/entities/client.entity";

@Entity()
export class ProcessLine extends DefaultEntity{
    @Column()
    name:string;

    @ManyToOne(()=>Client, client=>client.processLines);
    client:typeof Client;

    @OneToMany(()=>Section, section=>section.processLine)
    sections:Section[];

}