import { int } from "aws-sdk/clients/datapipeline";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class QueryApplyFriendListResponse {
    users: FriendListElement[]
}

export class FriendListElement {
    id: string
    nickname: string
    profile: string
    isTurnOn: boolean
}

export class QueryUserInfoResponse {
    id: string
    nickname: string
    email: string
    point: number
    profile: string
}

export class UpdateUserRequest {
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, {
        message: '유효한 이메일 주소를 입력해주세요.',
    })
    email: string;
    @IsNotEmpty()
    @IsString()
    nickname: string;
}