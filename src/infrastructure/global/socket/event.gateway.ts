import {
    ConnectedSocket,
    MessageBody,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessageEntity } from '../../domain/chat/persistence/chat.message.entity';
import { Brackets, Repository } from 'typeorm';
import { ChatParticipantEntity } from '../../domain/chat/persistence/chat.participant.Entity';
import { ChatRoomEntity } from '../../domain/chat/persistence/chat.room.entity';

@WebSocketGateway()
export class EventGateway {
    constructor(
        @InjectRepository(ChatMessageEntity)
        private readonly chatMessageRepository: Repository<ChatMessageEntity>,
        @InjectRepository(ChatParticipantEntity)
        private readonly chatParticipantRepository: Repository<ChatParticipantEntity>,
        @InjectRepository(ChatRoomEntity)
        private readonly chatRoomRepository: Repository<ChatRoomEntity>
    ) {
    }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('nickname')
    handleNickName(@MessageBody() [nickname, userId], @ConnectedSocket() client: Socket) {
        client.data['nickname'] = nickname;
        client.data['userId'] = userId;
    }

    @SubscribeMessage('enter_room')
    handleJoinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
        client.join(roomId);
    }

    @SubscribeMessage('new_message')
    async handleMessage(@MessageBody() [message, roomId], @ConnectedSocket() client: Socket) {
        const createdAt = new Date();
        client.to(roomId).emit('new_message', `${client.data.nickname}: ${message}`, createdAt);

        const chatRoom = await this.chatRoomRepository.findOneBy({ id: roomId });

        await this.chatMessageRepository.insert(
            new ChatMessageEntity(
                message,
                createdAt,
                chatRoom,
                client.data.userId
            )
        );
    }

    @SubscribeMessage('leave_room')
    async handleDisconnecting(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
        const lastRead = new Date();

        client.leave(roomId);

        const participant = await this.chatParticipantRepository
            .createQueryBuilder('chatParticipant')
            .where('chatParticipant.chat_room_id = :chat_room_id', { chat_room_id: roomId })
            .andWhere(
                new Brackets((qb) => {
                    qb.where('chatParticipant.user_a_id = :user_a_id', { user_a_id: client.data.userId })
                        .orWhere('chatParticipant.user_b_id = :user_b_id', { user_b_id: client.data.userId });
                })
            )
            .getOne();

        if (participant.userAId === client.data.userId) {
            participant.lastARead = lastRead;
        } else if (participant.userBId === client.data.userId) {
            participant.lastBRead = lastRead;
        }

        await this.chatParticipantRepository.save(participant);
    }
}