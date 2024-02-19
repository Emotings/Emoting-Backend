import { BadRequestException, Injectable } from "@nestjs/common";
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
    ) {}

    async googleLogin(reqUser) {
        let user = await this.userRepository.findOne(reqUser.email)

        if (!user) {
            const newUser = new UserEntity();

            newUser.email = reqUser.email
            newUser.nickname = reqUser.givenName
            newUser.password = this.config.get('SECRET_PASSWORD')
            newUser.profile = reqUser.photo
            newUser.provider = 'GOOGLE'
            newUser.age = reqUser.age || 0

            user = await this.userRepository.save(newUser)
        }

        return this.jwtAdapter.receiveToken(user.email)
    }

    async kakaoLogin(reqUser) {
        let user = await this.userRepository.findOne(reqUser.email)

        if (!user) {
            const newUser = new UserEntity();

            newUser.email = reqUser.email
            newUser.nickname = reqUser.nickname
            newUser.password = this.config.get('SECRET_PASSWORD')
            newUser.profile = reqUser.photo
            newUser.provider = 'KAKAO'
            newUser.age = reqUser.age || 0

            user = await this.userRepository.save(newUser)
        }

        return this.jwtAdapter.receiveToken(user.email)
    }
}