import { DefaultEntity } from "src/common/default.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { SupplyChainIssue } from "./supplychain-issue.entity";

@Entity()
export class Comment extends DefaultEntity{

    @Column({nullable:true})
    text:string;

    @Column({
        type:'timestamptz',
        nullable:true
    })
    reviewedOnDate:Date;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn()
    reviewer: User[];

    @ManyToOne(()=>SupplyChainIssue, {nullable:true})
    supplyChainIssues: SupplyChainIssue[];

}