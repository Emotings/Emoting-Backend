import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../../../../infrastructure/domain/user/persistence/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtAdapter } from "../../../../infrastructure/global/jwt/jwt.adapter";
import { GoogleStrategy } from "../../../../infrastructure/global/oauth/google.strategy";
import { ConfigService } from "@nestjs/config";
import { LoginRequest, SignUpRequest } from "../dto/auth.dto";
import * as bcrypt from 'bcrypt';

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

            newUser.email = reqUser.email
            newUser.nickname = reqUser.givenName
            newUser.password = this.config.get('SECRET_PASSWORD')
            newUser.profile = reqUser.profile
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
            newUser.profile = reqUser.profile
            newUser.provider = 'NAVER'
            newUser.age = reqUser.age || 0

            user = await this.userRepository.save(newUser)
        }

        return this.jwtAdapter.receiveToken(user.email)
    }

    async localSignup(request: SignUpRequest) {
        let { email, password, nickname, age } = request
        if (await this.userRepository.existsBy({ email })) {
            throw new HttpException('Already Emails Exist', HttpStatus.CONFLICT)
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        await this.userRepository.save({ email, password: hashPassword, nickname, age, profile: "", provider: 'LOCAL' })
    }

    async localLogin(request: LoginRequest) {
        let email = request.email
        let user = await this.userRepository.findOneBy({ email })
        this.validateUser(request, user)
        return await this.jwtAdapter.receiveToken(user.email)
    }

    private validateUser(request: LoginRequest, user: UserEntity) {
        if (!user) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }
        if (user.provider !== 'LOCAL') {
            throw new HttpException(user.provider + ' login', HttpStatus.BAD_REQUEST)
        }
        if (!bcrypt.compareSync(request.password, user.password)) {
            throw new HttpException('Password Mismatched', HttpStatus.BAD_REQUEST)
        }
    }
}