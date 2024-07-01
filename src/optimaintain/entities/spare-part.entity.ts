import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Component } from "./component.entity";

@Entity()
export class SparePart extends DefaultEntity{
    @Column()
    name:string;

    @ManyToOne(()=>Component, component=>component.spareParts)
    component:typeof Component;
}