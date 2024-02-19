import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { GoogleStrategy } from "../oauth/google.strategy";
import { AuthController } from "../../../application/domain/auth/controller/auth.controller";
import { AuthService } from "../../../application/domain/auth/services/auth.service";
import { JwtAdapter } from "../jwt/jwt.adapter";
import { UserModule } from "./user.module";
import { KakaoStrategy } from "../oauth/kakao.strategy";
import { NaverStrategy } from "../oauth/naver.strategy";

@Global()
@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET')
            })
        }),
        PassportModule.registerAsync({
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => ({
                defaultStrategy: 'jwt'
            })
        })
    ],
    controllers: [ AuthController ],
    providers: [ JwtStrategy, JwtAdapter, GoogleStrategy, KakaoStrategy, NaverStrategy, AuthService, UserModule ],
    exports: [ JwtStrategy, PassportModule ]
})
export class AuthModule {
}