import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authServie: AuthService,
    ) {
    }

    @Post('google')
    @UseGuards(AuthGuard('google'))
    async socialLoginWithGoogle(@Req() req) {
        return this.authServie.googleLogin(req)
    }
}