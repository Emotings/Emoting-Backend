import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/persistence/user.entity';
import { ChatRoomEntity } from './chat.room.entity';

@Entity('tbl_chat_participant')
export class ChatParticipantEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ChatRoomEntity)
    @JoinColumn({ name: 'chat_room_id' })
    chatRoomId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    userId: string;
}