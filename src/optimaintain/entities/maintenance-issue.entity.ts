import { Client } from "src/clients/entities/client.entity";
import { DefaultEntity } from "src/common/default.entity";
import { CommunicationChannel, PriorityEnum, StatusEnum } from "src/common/enums/common.enum";
import { MaintenanceTask, ShiftEnum, WorkstationEnum } from "src/common/enums/optimaintain.enum";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class MaintenanceIssue extends DefaultEntity{

    @Column()
    issueId: string;

    @ManyToOne(()=>Client)
    @JoinColumn()
    client:Client;

    @Column()
    issueDate: Date;

    @Column({ type: 'enum', enum: WorkstationEnum, nullable: true })
    workstation: WorkstationEnum;

    @Column({ type: 'enum', enum: ShiftEnum })
    shift: ShiftEnum;

    @Column({ type: 'enum', enum: MaintenanceTask })
    maintenanceTask: MaintenanceTask;

    @Column({ nullable: true })
    issueDescription: string;

    @Column({ type: 'enum', enum: PriorityEnum, nullable: true })
    severityLevel: PriorityEnum;

    @Column()
    isActionRequired: boolean;

    @Column({ type: 'enum', enum: StatusEnum })
    completionStatus: StatusEnum;

    @Column()
    scheduledCompletionDate: Date;

    // @Column('simple-array', { nullable: true })
    // reviewers: string[];

    
    @Column({ type: 'enum', enum: CommunicationChannel })
    communicationChannel: CommunicationChannel;

    @Column()
    reviewerRemarks: string;



}