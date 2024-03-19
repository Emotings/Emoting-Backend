import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomEntity } from '../../domain/chat/persistence/chat.room.entity';
import { ChatMessageEntity } from '../../domain/chat/persistence/chat.message.entity';
import { ChatParticipantEntity } from '../../domain/chat/persistence/chat.participant.Entity';
import { ChatController } from '../../../application/domain/chat/controller/chat.controller';
import { ChatService } from '../../../application/domain/chat/service/chat.service';

const CHAT_REPOSITORY = TypeOrmModule.forFeature([ChatRoomEntity, ChatMessageEntity, ChatParticipantEntity]);

@Global()
@Module({
    imports: [CHAT_REPOSITORY],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [CHAT_REPOSITORY]
})
export class ChatModule {
}