import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, OneToOne} from "typeorm";
import { OrderLineItem } from "./order-lineitem.entity";

export enum RMStageStatus{
    PO_ISSUED="PO_ISSUED",
    ACKNOWLEDGED="ACKNOWLEDGED",
    PROCUREMENT="PROCUREMENT",
    PROCESSING= "PROCESSING",
    PACKAGING="PACKAGING",
    DISPATCH="DISPATCH",
    DELIVERED="DELIVERED"
}
@Entity()
export class RmSkuStage extends DefaultEntity{

    @Column({
        type:'enum',
        enum:RMStageStatus,
        default:RMStageStatus.PO_ISSUED,
        nullable:true,
    })
    stage:RMStageStatus;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    ackDate:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    poDate:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    procurementDate:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    actualProcessingDate:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    predictedProcessingDate:Date;

    
    @Column({
        type:'timestamptz',
        nullable:true
    })
    actualPackagingDate:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    actualDispatchDate:Date;

    
    @Column({
        type:'timestamptz',
        nullable:true
    })
    predictedDispatchDate:Date;

    
    @Column({
        type:'timestamptz',
        nullable:true
    })
    actualDeliveryDate:Date;

    
    @Column({
        type:'timestamptz',
        nullable:true
    })
    predictedDeliveryDate:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    lastReminderMailSentAt:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    lastReminderWhatsappSentAt:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    lastNotificationSentAt:Date;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    lastManualMailSentAt:Date;

    @Column({
        type:'int4',
        nullable:true,
    })
    manualMailSentCount:number;

    @Column({
        type:'varchar',
        nullable:true
    })
    emailRecepient:string;

    @Column({
        type:'varchar',
        nullable:true
    })
   recepientEmail:string;

    @Column({
        type:'varchar',
        nullable:true
    })
    whatsappRecipient:string;

    @Column({
        type:'varchar',
        nullable:true
    })
    whatsappRecepientNumber:string;

    @Column({
        type:'int4',
        nullable:true
    })
    escalationLevel:number;

    @OneToOne(()=>OrderLineItem, {nullable:true})
    orderLineItem:typeof OrderLineItem;
}