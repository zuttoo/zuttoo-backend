import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProcessLine } from "./process-line.entity";
import { Equipment } from "./equipment.entity";

@Entity()
export class Section extends DefaultEntity{
    @Column()
    name:string;

    @ManyToOne(()=>ProcessLine, processLine=>processLine.sections)
    processLine:typeof ProcessLine;

    @OneToMany(()=>Equipment, equipment=>equipment.section)
    equipments:Equipment[];


}