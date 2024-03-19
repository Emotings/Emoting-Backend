import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../../../infrastructure/global/decorator/current-user';
import { UserEntity } from '../../../../infrastructure/domain/user/persistence/user.entity';
import { QueryChatMessageList, QueryJoinRoomsListResponse, RandomRoomResponse } from '../dto/chat.dto';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) {
    }

    @Post('random')
    @UseGuards(AuthGuard())
    async createRandomRoom(@CurrentUser() user: UserEntity): Promise<RandomRoomResponse> {
        return this.chatService.createRandomRoom(user);
    }

    @Get('rooms')
    @UseGuards(AuthGuard())
    async queryJoinedRooms(@CurrentUser() user: UserEntity): Promise<QueryJoinRoomsListResponse> {
        return this.chatService.queryJoinRooms(user);
    }

    @Get('/messages/:id')
    @UseGuards(AuthGuard())
    async queryChatMessages(@Param() id: string, @CurrentUser() user: UserEntity): Promise<QueryChatMessageList> {
        return this.chatService.queryChatMessage(id, user);
    }
}