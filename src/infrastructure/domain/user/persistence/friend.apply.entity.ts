import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('tbl_friend_apply')
export class FriendApplyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('enum', { enum: [ 'WAIT', 'ACCEPT', 'REJECT' ], nullable: false, default: 'WAIT' })
    status; // WAIT = 대기 / ACCEPT = 수락 / REJECT = 거절

    @ManyToOne(() => UserEntity, { lazy: true })
    @JoinColumn({ name: 'request_user_id' })
    requestUserId: UserEntity;

    @ManyToOne(() => UserEntity, { lazy: true })
    @JoinColumn({ name: 'receive_user_id' })
    receiveUserId: UserEntity;
}