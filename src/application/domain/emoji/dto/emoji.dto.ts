import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateEmojiRequest {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsNotEmpty()
    @IsString()
    imageUrl: string;
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
