import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Section } from "./section.entity";

@Entity()
export class ProcessLine extends DefaultEntity{
    @Column()
    name:string;

    @OneToMany(()=>Section, section=>section.processLine)
    sections:Section[];

}