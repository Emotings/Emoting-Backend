import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(private config: ConfigService) {
        super({
            clientID: config.get('KAKAO_CLIENT_ID'),
            callbackURL: config.get('KAKAO_REDIRECT_URL')
        });
    }

    async validate(profile) {
        return {
            email: profile.emails[0].value,
            nickname: profile.nickname,
            photo: profile.photos[0].value,
        }
    }
}