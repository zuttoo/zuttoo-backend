import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Equipment } from "./equipment.entity";
import { SparePart} from "./spare-part.entity";

@Entity()
export class Component extends DefaultEntity{
    @Column()
    name:string;

    @ManyToOne(()=>Equipment, equipment=>equipment.components)
    equipment:typeof Equipment;

    @OneToMany(()=>SparePart, sparePart=>sparePart.component)
    spareParts:SparePart[]

}