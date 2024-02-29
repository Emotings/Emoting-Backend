export class QueryApplyFriendListResponse {
    users: FriendListElement[]
}

export class FriendListElement {
    nickname: string
    profile: string
    isTurnOn: boolean
}