import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Component } from "./component.entity";

@Entity()
export class SparePart extends DefaultEntity{
    @Column()
    name:string;

    @Column({nullable:true, type:'int'})
    count:number;

    @ManyToOne(()=>Component, component=>component.spareParts)
    component:typeof Component;
}