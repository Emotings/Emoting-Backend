import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { UserEntity } from '../../user/persistence/user.entity';
import { ChatRoomEntity } from './chat.room.entity';

@Entity('tbl_chat_participant')
export class ChatParticipantEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ChatRoomEntity)
    @JoinColumn({ name: 'chat_room_id' })
    chatRoom: ChatRoomEntity;

    @RelationId((chatParticipant: ChatParticipantEntity) => chatParticipant.chatRoom)
    chatRoomId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_a_id' })
    userA: UserEntity;

    @RelationId((chatParticipant: ChatParticipantEntity) => chatParticipant.userA)
    userAId: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_b_id' })
    userB: UserEntity;

    @RelationId((chatParticipant: ChatParticipantEntity) => chatParticipant.userB)
    userBId: string;

    @Column('datetime', { nullable: false })
    lastARead: Date;

    @Column('datetime', { nullable: false })
    lastBRead: Date;

    constructor(chatRoom: ChatRoomEntity, userA: UserEntity, userB: UserEntity, lastRead: Date) {
        this.chatRoom = chatRoom;
        this.userA = userA;
        this.userB = userB;
        this.lastARead = lastRead;
        this.lastBRead = lastRead;
    }
}