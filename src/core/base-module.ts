import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn} from "typeorm";

export class BaseModule extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @CreateDateColumn()
    createdAt!: string
}