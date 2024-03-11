import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FriendApplyEntity } from "../../../../infrastructure/domain/user/persistence/friend.apply.entity";
import { FriendListElement, QueryApplyFriendListResponse } from "../dto/user.dto";
import { UserEntity } from "../../../../infrastructure/domain/user/persistence/user.entity";
import { FriendEntity } from "../../../../infrastructure/domain/user/persistence/friend.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(FriendApplyEntity)
        private friendApplyRepository: Repository<FriendApplyEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(FriendEntity)
        private friendRepository: Repository<FriendEntity>,
    ) {
    }

    async applyFriend(id, req) {
        let friendApply = new FriendApplyEntity();
        let friend = await this.userRepository.findOne({ where: id })

        if (!friend) {
            throw new HttpException('User(Friend) Not Found', HttpStatus.NOT_FOUND)
        }

        if (await this.friendApplyRepository.existsBy({ requestUserId: req, receiveUserId: friend })) {
            throw new HttpException('Already Apply', HttpStatus.CONFLICT)
        }

        friendApply.status = 'WAIT'
        friendApply.requestUserId = req
        friendApply.receiveUserId = friend

        await this.friendApplyRepository.save(friendApply)
    }

    async queryApplyFriend(req) {
        let applyList = await this.friendApplyRepository.findBy({ receiveUserId: req })
        let friendListResponse = new QueryApplyFriendListResponse();

        friendListResponse.users = await Promise.all(applyList.map(async (friend) => {
            let requestUser = await this.userRepository.findOneBy(friend.requestUserId);
            let element = new FriendListElement();

            element.id = friend.id
            element.nickname = requestUser.nickname
            element.profile = requestUser.profile
            element.isTurnOn = requestUser.isTurnOn

            return element
        }))

        return friendListResponse
    }

    async queryFriend(req) {
        let friendList = await this.friendRepository.findBy([ { userId1: req }, { userId2: req } ])
        let friendListResponse = new QueryApplyFriendListResponse();

        friendListResponse.users = await Promise.all(friendList.map(async (friend) => {
            let requestUser = await this.userRepository.findOneBy({ id: friend.userId2.id });
            let element = new FriendListElement();

            element.id = friend.id
            element.nickname = requestUser.nickname
            element.profile = requestUser.profile
            element.isTurnOn = requestUser.isTurnOn

            return element
        }))
        return friendListResponse
    }

    async searchUser(keyword) {
        let users = await this.userRepository.findBy({ nickname: keyword })

        let friendListResponse = new QueryApplyFriendListResponse();
        friendListResponse.users = await Promise.all(users.map(async (user) => {
            let requestUser = await this.userRepository.findOneBy({ id: user.id });
            let element = new FriendListElement();

            element.id = user.id
            element.nickname = requestUser.nickname
            element.profile = requestUser.profile
            element.isTurnOn = requestUser.isTurnOn

            return element
        }))

        return friendListResponse
    }

    async updateApplyStatus(id, status, req) {
        let apply = await this.friendApplyRepository.findOne({ where: id })

        if (!apply) {
            throw new HttpException('Apply Not Found', HttpStatus.NOT_FOUND)
        }

        if (status === 'ACCEPT') {
            let user = await apply.requestUserId

            let friend = new FriendEntity();

            friend.userId1 = req
            friend.userId2 = user

            await this.friendApplyRepository.delete(apply)
            await this.friendRepository.save(friend)
        } else if (status === 'REJECT') {
            await this.friendApplyRepository.delete(apply)
        }
    }

    async notificationOnOff(isTurnOn, req) {
        let user = await this.userRepository.findOne({ where: req })

        if (!user) {
            throw new HttpException('User Not Found', 404)
        }

        user.isTurnOn = isTurnOn == 'true'? true : false
        await this.userRepository.save(user)
    }
}