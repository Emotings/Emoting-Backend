export class QueryApplyFriendListResponse {
    users: FriendListElement[]
}

export class FriendListElement {
    id: string
    nickname: string
    profile: string
    isTurnOn: boolean
}