import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../../infrastructure/domain/user/persistence/user.entity';
import { Repository } from 'typeorm';
import { ChatRoomEntity } from '../../../../infrastructure/domain/chat/persistence/chat.room.entity';
import { ChatParticipantEntity } from '../../../../infrastructure/domain/chat/persistence/chat.participant.Entity';
import { QueryChatMessageList, QueryJoinRoomsListResponse, RandomRoomResponse, RoomsList } from '../dto/chat.dto';
import { ChatMessageEntity } from '../../../../infrastructure/domain/chat/persistence/chat.message.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ChatRoomEntity)
        private readonly chatRoomRepository: Repository<ChatRoomEntity>,
        @InjectRepository(ChatParticipantEntity)
        private readonly chatParticipantEntity: Repository<ChatParticipantEntity>,
        @InjectRepository(ChatMessageEntity)
        private readonly chatMessageRepository: Repository<ChatMessageEntity>
    ) {
    }

    async createRandomRoom(user: UserEntity): Promise<RandomRoomResponse> {
        const queryAUser = this.chatParticipantEntity
            .createQueryBuilder('chatParticipant')
            .select('chatParticipant.user_a_id')
            .where('chatParticipant.user_b_id = :user_b_id', { user_b_id: user.id });

        const queryBUser = this.chatParticipantEntity
            .createQueryBuilder('chatParticipant')
            .select('chatParticipant.user_b_id')
            .where('chatParticipant.user_a_id = :user_a_id', { user_a_id: user.id });

        const AUser = await queryAUser.getRawMany();
        const BUser = await queryBUser.getRawMany();
        const AUserIds = AUser.map(a => a.user_a_id);
        const BUserIds = BUser.map(b => b.user_b_id);

        let queryRandomUser = this.userRepository
            .createQueryBuilder('user')
            .orderBy('RAND()')
            .where('user.id != (:userId)', { userId: user.id });

        if (AUserIds.length > 0) {
            queryRandomUser = queryRandomUser.andWhere('user.id NOT IN (:...AUserIds)', { AUserIds: AUserIds });
        }
        if (BUserIds.length > 0) {
            queryRandomUser = queryRandomUser.andWhere('user.id NOT IN (:...BUserIds)', { BUserIds: BUserIds });
        }

        const randomUser = await queryRandomUser.getOne();

        if (randomUser === null) {
            throw new ConflictException('No More Random Users');
        }

        const chatRoom = await this.chatRoomRepository.save(
            new ChatRoomEntity(new Date()));

        await this.chatParticipantEntity.insert([
            new ChatParticipantEntity(
                chatRoom,
                user,
                randomUser,
                new Date()
            )
        ]);

        return {
            roomId: chatRoom.id,
            chatPartner: randomUser.nickname
        };
    }

    async queryJoinRooms(user: UserEntity): Promise<QueryJoinRoomsListResponse> {
        const rooms = await this.chatParticipantEntity.createQueryBuilder('participant')
            .select('participant.chat_room_id', 'chat_room_id')
            .addSelect('MAX(chatMessage.created_at)', 'latest_message_at')
            .addSelect(`CASE 
                        WHEN participant.user_a_id = :userId THEN userB.nickname 
                        ELSE userA.nickname 
                    END`, 'participant_nickname')
            .addSelect(`CASE 
                        WHEN participant.user_a_id = :userId THEN userB.profile 
                        ELSE userA.profile 
                    END`, 'participant_profile')
            .addSelect(`CASE 
                        WHEN participant.user_a_id = :userId THEN participant.last_a_read 
                        ELSE participant.last_b_read 
                    END`, 'last_read')
            .leftJoin('tbl_chat_message', 'chatMessage', 'chatMessage.chat_room_id = participant.chat_room_id')
            .leftJoin('participant.userA', 'userA')
            .leftJoin('participant.userB', 'userB')
            .where('participant.user_a_id = :user_a_id', { user_a_id: user.id })
            .orWhere('participant.user_b_id = :user_b_id', { user_b_id: user.id })
            .setParameter('userId', user.id)
            .groupBy('participant.chat_room_id')
            .addGroupBy('userA.nickname')
            .addGroupBy('userB.nickname')
            .addGroupBy('participant.user_a_id')
            .addGroupBy('participant.user_b_id')
            .addGroupBy('participant.last_a_read')
            .addGroupBy('participant.last_b_read')
            .orderBy('latest_message_at', 'DESC')
            .getRawMany();

        return {
            rooms: rooms.map(room => ({
                chatRoomId: room.chat_room_id,
                userProfile: room.participant_profile,
                nickname: room.participant_nickname,
                alreadyRead: new Date(room.last_read) >= new Date(room.latest_message_at)
            }))
        };
    }

    async queryChatMessage(chatRoomId: string, user: UserEntity): Promise<QueryChatMessageList> {
        const chatMessageEntities = await this.chatMessageRepository.find(
            { where: { chatRoomId: chatRoomId }, order: { createdAt: 'DESC' } });

        return {
            chatMessages: chatMessageEntities.map(chatMessage => ({
                message: chatMessage.message,
                myMessage: chatMessage.userId === user.id
            }))
        };
    }
}