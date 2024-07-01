import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Section } from "./section.entity";
import { Component } from "./component.entity";

@Entity()
export class Equipment extends DefaultEntity{
    @Column()
    name:string;

    @ManyToOne(()=>Section, section=>section.equipment)
    section:typeof Section;

    @OneToMany(()=>Component, component=>component.equipment)
    components:Component[];
}