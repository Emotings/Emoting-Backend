import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmojiEntity } from "../../../../infrastructure/domain/emoji/persistence/emoji.entity";
import { Repository } from "typeorm";
import { CreateEmojiRequest } from "../dto/emoji.dto";

@Injectable()
export class EmojiService {
    constructor(
        @InjectRepository(EmojiEntity)
        private emojiRepository: Repository<EmojiEntity>,
    ) {
    }

    async createEmoji(req, request: CreateEmojiRequest) {
        let { title, content, imageUrl, price } = request
        await this.emojiRepository.save({ title: title, content: content, image: imageUrl, price: price, userId: req })
    }
}