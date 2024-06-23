import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity } from "typeorm";

import { DefectSeverityEnum, DefectTypeEnum } from "src/common/enums/quality-assurance.enum";

@Entity()
export class QualityAssuranceIssue extends DefaultEntity{
    @Column({nullable:true})
    batchId:string;

    @Column({nullable:true})
    productCode:string;

    @Column({type:'timestamp with time zone',nullable:true})
    startDateTime:Date;


    @Column({type:'timestamp with time zone',nullable:true})
    endDateTime:Date;


    @Column({nullable:true})
    tubeMaterial:string;


    @Column({nullable:true})
    tubeDimension:string;


    @Column({nullable:true})
    tubeSupplier:string; 

    @Column({nullable:true})
    tubeLot:string; 

    @Column({nullable:true})
    axialFeedRate:number;
    
    @Column({nullable:true})
    hydraulicPressure:number;

    @Column({
        type:'enum',
        enum:DefectTypeEnum,
        nullable:true
        
    })
    defectType:DefectTypeEnum;

    
    @Column({
        type:'enum',
        enum:DefectSeverityEnum,
        nullable:true
        
    })
    severityType:DefectSeverityEnum;

    @Column({nullable:true})
    totalParts:number;

    
    @Column({nullable:true})
    acceptedParts:number;

    @Column({nullable:true})
    defectQuantity:number;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    defectRate:number;

}