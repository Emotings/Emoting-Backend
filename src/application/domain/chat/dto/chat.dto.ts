export class RandomRoomResponse {
    roomId: string;
    chatPartner: string;
}

export class QueryJoinRoomsListResponse {
    rooms: RoomsList[];
}

export class RoomsList {
    chatRoomId: string;
    userProfile: string;
    nickname: string;
    alreadyRead: boolean;
}

export class QueryChatMessageList {
    chatMessages: MessageList[];
}

export class MessageList {
    message: string;
    myMessage: boolean;
}