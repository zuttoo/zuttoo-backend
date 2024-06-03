import { Client } from "src/clients/entities/client.entity";
import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { SupplyChainIssueCategoryEnum,SupplyChainIssueDescriptionEnum,SupplyChainSubIssueEnum } from "../../common/enums/supplychain.enum";
import { Supplier } from "src/suppliers/entities/supplier.entity";
import { PriorityEnum, StatusEnum } from "src/common/enums/common.enum";
import { ReviewerComment } from "./reviewer-comment";
import { Attachment } from "./attachment.entity";

@Entity()
export class SupplyChainIssue extends DefaultEntity {

    @ManyToOne(()=>Client, (client)=>client.supplyChainIssues, {nullable:true})
    client:typeof Client;

    @Column({nullable:true})
    issueId:string;

    @Column({nullable:true})
    title:string;

    @Column({nullable:true})
    materialNumber:string;


    @Column({nullable:true})
    purchaseOrderNumber:string;

    @Column({nullable:true})
    vehicleNumber:string;

    @Column({nullable:true})
    deliveryOrderNumber:string;

    @Column({
        type:'enum',
        enum:SupplyChainIssueCategoryEnum,
        nullable:true
    })
    category:SupplyChainIssueCategoryEnum;

    @Column({
        type:'enum',
        enum:SupplyChainIssueDescriptionEnum,
        nullable:true
    })
    description:SupplyChainIssueDescriptionEnum;

    @Column({
        type:'enum',
        enum:SupplyChainSubIssueEnum,
        nullable:true
    })
    subIssue:SupplyChainSubIssueEnum;

    @ManyToOne(()=>Supplier,(supplier)=>supplier.supplyChainIssues, {nullable:true})
    supplier:typeof Supplier;

    @Column({
        type:'enum',
        enum:PriorityEnum,
        default:PriorityEnum.HIGH
    })
    priority:PriorityEnum

    @Column({
        type:'enum',
        enum:StatusEnum,
        default:StatusEnum.CONCERN_RAISED
    })
    status:StatusEnum

    // @OneToMany(()=>ReviewerComment, (reviewerComment)=>reviewerComment.scIssues)
    // reviewerComments:ReviewerComment[];

    @OneToMany(()=>Attachment, (attachment)=>attachment.supplyChainIssue, {nullable:true, cascade:true})
    attachments:Attachment[];

}
