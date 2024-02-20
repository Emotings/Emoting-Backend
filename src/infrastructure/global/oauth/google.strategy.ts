import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private config: ConfigService) {
        super({
            clientID: config.get('GOOGLE_CLIENT_ID'),
            clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: config.get('GOOGLE_REDIRECT_URL'),
            scope: [ 'email', 'profile' ]
        });
    }

    async validate(profile: Profile) {
        return {
            email: profile._json.email,
            name: profile._json.given_name,
            photo: profile._json.profile
        }
    }
}