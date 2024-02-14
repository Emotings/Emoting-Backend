import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true, nullable: false, length: 50 })
    email: string;

    @Column('char', { nullable: false, length: 60 })
    password: string;
}