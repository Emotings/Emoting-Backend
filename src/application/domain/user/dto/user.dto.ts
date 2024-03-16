import { int } from "aws-sdk/clients/datapipeline";

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