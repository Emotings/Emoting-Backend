import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private authServie: AuthService,
    ) {
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async socialLoginWithGoogle() {
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async GoogleCallback(@Req() req) {
        return this.authServie.googleLogin(req)
    }

    @Get('kakao')
    @UseGuards(AuthGuard('kakao'))
    async socialLoginWithKakao() {
    }

    @Get('kakao/callback')
    @UseGuards(AuthGuard('kakao'))
    async KakaoCallback(@Req() req) {
        return this.authServie.kakaoLogin(req)
    }

    @Get('naver')
    @UseGuards(AuthGuard('naver'))
    async socialLoginWithNaver() {
    }

    @Get('naver/callback')
    @UseGuards(AuthGuard('naver'))
    async naverCallback(@Req() req) {
        return this.authServie.naverLogin(req)
    }
}