import { DefaultEntity } from "src/common/default.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { SupplyChainIssue } from "./supplychain-issue.entity";

@Entity()
export class Attachment extends DefaultEntity{
    
    @Column({nullable:true})
    s3Link:string;

    @ManyToOne(()=>SupplyChainIssue, (supplyChainIssue)=>supplyChainIssue.attachments, {nullable:true, onDelete:'CASCADE'})
    @JoinColumn()
    supplyChainIssue:SupplyChainIssue[]
}