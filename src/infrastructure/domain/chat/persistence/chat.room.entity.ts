import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_chat_room')
export class ChatRoomEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('datetime', { nullable: false })
    createdAt: Date;

    @Column('varchar', { nullable: false, length: 1000 })
    lastMessage: string;

    constructor(createdAt: Date) {
        this.createdAt = createdAt;
        this.lastMessage = '';
    }
}