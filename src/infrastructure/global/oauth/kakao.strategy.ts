import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(private config: ConfigService) {
        super({
            clientID: config.get('KAKAO_CLIENT_ID'),
            clientSecret: config.get('KAKAO_CLIENT_SECRET'),
            callbackURL: config.get('KAKAO_REDIRECT_URL'),
            scope: [ 'account_email', 'profile' ]
        });
    }

    async validate(profile: Profile) {
        return {
            email: profile.emails[0].value,
            nickname: profile.username,
            photo: profile.photos[0].value,
        }
    }
}