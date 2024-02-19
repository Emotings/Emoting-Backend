import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-naver";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor(config: ConfigService) {
        super({
            clientId: config.get('NAVER_CLIENT_ID'),
            callbackURL: config.get('NAVER_REDIRECT_URL')
        });
    }

    async validate(profile) {
        return {
            email: profile.email,
            nickname: profile.nickname,
            photo: profile.profile_image,
        }
    }
}