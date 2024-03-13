import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { ChatRoomEntity } from './chat.room.entity';
import { UserEntity } from '../../user/persistence/user.entity';

@Entity('tbl_chat_message')
export class ChatMessageEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { nullable: false, length: 1000 })
    message: string;

    @Column('datetime', { nullable: false })
    createdAt: Date;

    @ManyToOne(() => ChatRoomEntity)
    @JoinColumn({ name: 'chat_room_id' })
    chatRoom: ChatRoomEntity;

    @Column({ name: 'chat_room_id' })
    chatRoomId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @RelationId((chatMessage: ChatMessageEntity) => chatMessage.user)
    userId: string;

    constructor(message: string, createdAt: Date, chatRoom: ChatRoomEntity, user: UserEntity) {
        this.message = message;
        this.createdAt = createdAt;
        this.chatRoom = chatRoom;
        this.user = user;
    }
}