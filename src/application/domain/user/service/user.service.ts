import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FriendApplyEntity } from "../../../../infrastructure/domain/user/persistence/friend.apply.entity";
import { FriendListElement, QueryApplyFriendListResponse } from "../dto/user.dto";
import { UserEntity } from "../../../../infrastructure/domain/user/persistence/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(FriendApplyEntity)
        private friendApplyRepository: Repository<FriendApplyEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
    }

    async applyFriend(id, req) {
        let friendApply = new FriendApplyEntity();
        let friend = await this.userRepository.findOne({ where: id })

        if (!friend) {
            throw new HttpException('User(Friend) Not Found', 404)
        }

        if (await this.friendApplyRepository.existsBy({ requestUserId: req, receiveUserId: friend })) {
            throw new HttpException('Already Apply', 409)
        }

        friendApply.status = 'WAIT'
        friendApply.requestUserId = req
        friendApply.receiveUserId = friend

        await this.friendApplyRepository.save(friendApply)
    }

    async queryApplyFriend(req) {
        let friendList = await this.friendApplyRepository.findBy({ receiveUserId: req })
        let friendListResponse = new QueryApplyFriendListResponse();

        friendListResponse.users = await Promise.all(friendList.map(async (friend) => {
            let requestUser = friend.requestUserId
            let element = new FriendListElement();

            element.nickname = requestUser.nickname
            element.profile = requestUser.profile
            element.isTurnOn = requestUser.isTurnOn

            return element
        }))

        return friendListResponse
    }
}