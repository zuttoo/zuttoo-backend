import { DefaultEntity } from "src/common/default.entity";
import { Collection, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Section } from "./section.entity";
import { Component } from "./component.entity";
import { Client } from "src/clients/entities/client.entity";
import { EquipmentStatusEnum } from "src/common/enums/optimaintain.enum";
import { SparePart } from "./spare-part.entity";

@Entity()
export class Equipment extends DefaultEntity{
    @Column()
    name:string;

    @Column({nullable:true})
    identificationNumber:string;

    @Column({nullable:true})
    maker:string;

    @Column({type:'timestamptz', nullable:true})
    installationDate:Date;

    @Column({type:'timestamptz', nullable:true})
    lastBreakdownDate:Date;

    @Column({type:'timestamptz', nullable:true})
    lastDailyManagementDate:Date;

    @Column({type:'timestamptz', nullable:true})
    lastPreventiveMaintenanceDate:Date;


    
    @Column({type:'timestamptz', nullable:true})
    nextPreventiveMaintenanceDate:Date;

    @Column({type:'boolean', nullable:true})
    isPredictiveMaintenanceDone:boolean;

    @Column({type:'boolean', nullable:true})
    isSensorInstalled:boolean;

    @Column({type:'decimal',nullable:true, precision:10,scale:4})
    healthPercentage:number;

    @Column({type:'enum', enum:EquipmentStatusEnum, nullable:true})
    status:EquipmentStatusEnum;

    @ManyToOne(()=>Section, section=>section.equipment)
    section:typeof Section;

    @OneToMany(()=>Component, component=>component.equipment)
    components:Component[];
}