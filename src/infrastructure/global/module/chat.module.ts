import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoomEntity } from '../../domain/chat/persistence/chat.room.entity';
import { ChatMessageEntity } from '../../domain/chat/persistence/chat.message.entity';
import { ChatParticipantEntity } from '../../domain/chat/persistence/chat.participant.Entity';

const CHAT_REPOSITORY = TypeOrmModule.forFeature([ChatRoomEntity, ChatMessageEntity, ChatParticipantEntity]);

@Global()
@Module({
    imports: [CHAT_REPOSITORY],
    controllers: [],
    providers: [],
    exports: [CHAT_REPOSITORY]
})
export class UserModule {
}