import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { OrderLineItem } from "src/orders/entities/order-lineitem.entity";

@Entity()
export class RmSkuCharacteristics extends DefaultEntity{
    
   @OneToOne(()=>OrderLineItem)
   @JoinColumn()
   orderLineItem:OrderLineItem[];

    @Column({nullable:true})
    tcUrl:string;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    carbonPercentage: number;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    mnPercentage: number;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    siPercentage: number;

    
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    pPercentage: number;

    
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    alPercentage: number;
    
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    nPercentage: number;

    
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    tiPercentage: number;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    nbPercentage: number;

    
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    crPercentage: number;

    
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    cuPercentage: number;

    
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    moPercentage: number;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    niPercentage: number;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    vPercentage: number;
    
    @Column({ 
        nullable:true
    })
    batchNo:string;
    
    @Column({ 
        nullable:true
    })
    motherCoilNo:string;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    tonnage:number;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    length:number;

    @Column({nullable:true, type:'int' })
    nos:number;


    @Column({ 
        nullable:true
    })
    ultimateTensileStrengthMpa:string;

    @Column({ 
        nullable:true
    })
    elongationPercentage:string;

    @Column({ 
        nullable:true
    })
    yieldStressMpa:string;

    @Column({ 
        nullable:true, type:'boolean'
    })
    isHydrotestingDone:string;

    
    @Column({ 
        nullable:true, type:'boolean'
    })
    isDriftingDone:string;

    
    @Column({ 
        nullable:true, type:'boolean'
    })
    isFlatteningDone:string;

    
    @Column({ 
        nullable:true, type:'boolean'
    })
    isEctDone:string;

    
    @Column({ 
        nullable:true, type:'boolean'
    })
    isCrushingDone:string;

    
    @Column({ 
        nullable:true, type:'boolean'
    })
    isWeldMacroExamDone:string;

    

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    outerDiameterMm:number;

       
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    innerDiameterMm:number;

    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    lengthM:number;

    @Column({
        nullable:true, 
    })
    tcNo:string;

    @Column({
        nullable:true
    })
    tdcNo:string
















}