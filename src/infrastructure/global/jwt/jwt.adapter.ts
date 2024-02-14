import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '../../../application/domain/auth/dto/auth.dto';

@Injectable()
export class JwtAdapter {
    constructor(
        private readonly jwtService: JwtService
    ) {
    }

    async receiveToken(username: string): Promise<TokenResponse> {
        const accessToken = await this.generateToken(username, '1h', 'access');
        return {
            accessToken
        };
    }

    private async generateToken(username: string, exp: string, type: string) {
        return await this.jwtService.signAsync(
            { sub: username, type },
            { expiresIn: exp }
        );
    }
}