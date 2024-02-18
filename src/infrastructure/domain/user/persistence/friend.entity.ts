import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('tbl_friend')
export class FriendEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id1' })
    userId1: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id2' })
    user_id2: string;
}