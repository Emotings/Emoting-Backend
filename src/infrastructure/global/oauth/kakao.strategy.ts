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
            callbackURL: config.get('KAKAO_REDIRECT_URL')
        });
    }

    async validate(profile: Profile) {
        return {
            email: profile.kakao_account.email,
            nickname: profile.properties.nickname,
            photo: profile.properties.profile_image,
        }
    }
}