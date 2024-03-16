import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmojiEntity } from "../../../../infrastructure/domain/emoji/persistence/emoji.entity";
import { Between, Repository } from "typeorm";
import { CreateEmojiRequest, EmojiElement, QueryEmojiResponse } from "../dto/emoji.dto";

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

    async queryEmojiFilter(min, max) {
        let emojis = await this.emojiRepository.findBy({ price: Between(min, max) })
        return this.queryEmoji(emojis)
    }

    async queryEmojiAll() {
        let emojis = await this.emojiRepository.find()
        return this.queryEmoji(emojis)
    }

    private async queryEmoji(emojis) {
        let response = new QueryEmojiResponse()

        response.emojis = await Promise.all(emojis.map(async (emoji) => {
            let element = new EmojiElement()

            element.id = emoji.id
            element.title = emoji.title
            element.content = emoji.content
            element.image = emoji.image
            element.price = emoji.price

            return element
        }))

        return response
    }
}