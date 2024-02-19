import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../../../../infrastructure/domain/user/persistence/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtAdapter } from "../../../../infrastructure/global/jwt/jwt.adapter";
import { GoogleStrategy } from "../../../../infrastructure/global/oauth/google.strategy";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtAdapter: JwtAdapter,
        private googleStrategy: GoogleStrategy,
        private config: ConfigService
    ) {
    }

    async googleLogin(reqUser) {
        let user = await this.userRepository.findOne(reqUser.emails[0].value)

        if (!user) {
            const newUser = new UserEntity();

            newUser.email = reqUser.emails[0].value
            newUser.nickname = reqUser.givenName
            newUser.password = this.config.get('SECRET_PASSWORD')
            newUser.profile = reqUser.photos[0].value
            newUser.provider = 'GOOGLE'
            newUser.age = reqUser.age || 0

            user = await this.userRepository.save(newUser)
        }

        return this.jwtAdapter.receiveToken(user.email)
    }

    async kakaoLogin(reqUser) {
        let user = await this.userRepository.findOne(reqUser.kakao_account.email)

        if (!user) {
            const newUser = new UserEntity();

            newUser.email = reqUser.kakao_account.email
            newUser.nickname = reqUser.properties.nickname
            newUser.password = this.config.get('SECRET_PASSWORD')
            newUser.profile = reqUser.properties.profile_image
            newUser.provider = 'KAKAO'
            newUser.age = reqUser.age || 0

            user = await this.userRepository.save(newUser)
        }

        return this.jwtAdapter.receiveToken(user.email)
    }

    async naverLogin(reqUser) {
        let user = await this.userRepository.findOne(reqUser.email)

        if (!user) {
            const newUser = new UserEntity();

            newUser.email = reqUser.email
            newUser.nickname = reqUser.nickname
            newUser.password = this.config.get('SECRET_PASSWORD')
            newUser.profile = reqUser.profile_image
            newUser.provider = 'NAVER'
            newUser.age = reqUser.age || 0

            user = await this.userRepository.save(newUser)
        }

        return this.jwtAdapter.receiveToken(user.email)
    }
}