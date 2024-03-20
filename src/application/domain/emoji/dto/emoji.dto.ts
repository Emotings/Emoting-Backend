import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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

export class QueryEmojiResponse {
    emojis: EmojiElement[]
}

export class EmojiElement {
    id: string
    title: string
    content: string
    image: string
    price: number
}

export class UploadImageUrlResponse {
    imageUrl: string
}
