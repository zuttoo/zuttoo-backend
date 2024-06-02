import { DefaultEntity } from "src/common/default.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { SupplyChainIssue } from "./supplychain-issue.entity";

@Entity()
export class ReviewerComment extends DefaultEntity{

    @Column({nullable:true})
    comment:string;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    reviewedOnDate:Date;

    @OneToOne(()=>User, {nullable:true})
    reviewer:typeof User

    @ManyToOne(()=>SupplyChainIssue, (sci)=>sci.reviewerComments, {nullable:true})
    scIssues:typeof SupplyChainIssue;

}