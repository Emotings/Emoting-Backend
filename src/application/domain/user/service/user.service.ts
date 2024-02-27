import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FriendApplyEntity } from "../../../../infrastructure/domain/user/persistence/friend.apply.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(FriendApplyEntity)
        private friendApplyRepository: Repository<FriendApplyEntity>
    ) {
    }

    async applyFriend(req) {
        let friendApply = new FriendApplyEntity();

        console.log(req)

        friendApply.status = 'WAIT'
        friendApply.requestUserId = req.authInfo.id
        friendApply.receiveUserId = req.user.id

        await this.friendApplyRepository.save(friendApply)
    }
}