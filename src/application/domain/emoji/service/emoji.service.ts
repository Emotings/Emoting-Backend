import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmojiEntity } from "../../../../infrastructure/domain/emoji/persistence/emoji.entity";
import { Between, Repository } from "typeorm";
import { CreateEmojiRequest, EmojiElement, QueryEmojiResponse } from "../dto/emoji.dto";
import { UserEntity } from "../../../../infrastructure/domain/user/persistence/user.entity";
import { BuyEmojiEntity } from "../../../../infrastructure/domain/emoji/persistence/buy-emoji.entity";
import { throws } from "assert";

@Injectable()
export class EmojiService {
    constructor(
        @InjectRepository(EmojiEntity)
        private emojiRepository: Repository<EmojiEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(BuyEmojiEntity)
        private buyEmojiRepository: Repository<BuyEmojiEntity>,
    ) {
    }

    async createEmoji(req, request: CreateEmojiRequest) {
        let user = await this.userRepository.findOne({ where: req })
        let { title, content, imageUrl, price } = request
        let buyEmoji = new BuyEmojiEntity()

        if (!user) {
            throw new HttpException('User Not Found', 404)
        }

        let emoji = await this.emojiRepository.save({ title: title, content: content, image: imageUrl, price: price, userId: user})

        buyEmoji.userId = user
        buyEmoji.emojiId = emoji

        await this.buyEmojiRepository.save(buyEmoji)
    }

    async queryEmojiFilter(min, max) {
        let emojis = await this.emojiRepository.findBy({ price: Between(min, max) })
        return this.queryEmoji(emojis)
    }

    async queryEmojiAll() {
        let emojis = await this.emojiRepository.find()
        return this.queryEmoji(emojis)
    }

    async buyEmoji(req, id) {
        let user = await this.userRepository.findOne({ where: req })
        let emoji = await this.emojiRepository.findOne({ where: id })
        let buyEmoji = new BuyEmojiEntity();

        buyEmoji.userId = user
        buyEmoji.emojiId = emoji

        await this.validateBuyEmoji(user, emoji)

        user.point -= emoji.price
        await this.userRepository.save(user)
        await this.buyEmojiRepository.save(buyEmoji)
    }

    private async validateBuyEmoji(user, emoji) {
        if (!user) {
            throw new HttpException('User Not Found', 404)
        }

        if (!emoji) {
            throw new HttpException('Emoji Not Found', 404)
        }

        if (user.point < emoji.price) {
            throw new HttpException('Point Not Enough', 400)
        }
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