import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export abstract class DefaultEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @CreateDateColumn({
        type:'timestamptz'
    })
    createdAt:Date;

    @UpdateDateColumn({
        type:'timestamptz'
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type:'timestamptz'
    })
    softDeletedAt:Date;


}