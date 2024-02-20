import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Profile, Strategy } from "passport-naver";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor(config: ConfigService) {
        super({
            clientID: config.get('NAVER_CLIENT_ID'),
            callbackURL: config.get('NAVER_REDIRECT_URL'),
            scope: [ 'email', 'profile' ]
        });
    }

    async validate(profile: Profile) {
        return {
            email: profile._json.email,
            nickname: profile._json.nickname,
            profile: profile._json.profile_image,
            age: profile._json.age
        }
    }
}