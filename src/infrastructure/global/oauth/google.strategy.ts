import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
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

    async validate(profile) {
        return {
            email: profile.emails[0].value,
            name: profile.givenName,
            photo: profile.photos[0].value,
        }
    }
}