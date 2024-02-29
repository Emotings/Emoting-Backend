import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { unique: true, nullable: false, length: 50 })
    email: string;

    @Column('char', { nullable: false, length: 60 })
    password: string;

    @Column('varchar', { nullable: false, length: 15 })
    nickname: string;

    @Column('int', { nullable: false })
    age: number;

    @Column('varchar', { nullable: false, length: 3000 })
    profile: string;

    @Column('boolean', { nullable: false, default: true })
    isTurnOn: boolean;

    @Column('enum', { enum: [ 'LOCAL', 'GOOGLE', 'KAKAO', 'NAVER' ], nullable: false })
    provider;
}