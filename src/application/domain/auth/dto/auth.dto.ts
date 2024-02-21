import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class TokenResponse {
    accessToken: string;
}

export class SignUpRequest {
    @Matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, {
        message: '유효한 이메일 주소를 입력해주세요.',
    })
    email: string;

    @Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/, {
        message: '소문자, 숫자, 특수문자를 포함하여 5자 이상으로 입력해주세요.'
    })
    password: string;
    @IsNotEmpty()
    @IsString()
    nickname: string;
    @IsNotEmpty()
    @IsNumber()
    age: number;
}

export class LoginRequest {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}