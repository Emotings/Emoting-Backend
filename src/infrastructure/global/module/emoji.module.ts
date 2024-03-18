import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmojiEntity } from "../../domain/emoji/persistence/emoji.entity";
import { EmojiService } from "../../../application/domain/emoji/service/emoji.service";
import { EmojiController } from "../../../application/domain/emoji/controller/emoji.controller";
import { BuyEmojiEntity } from "../../domain/emoji/persistence/buy-emoji.entity";

const EMOJI_REPOSITORY = TypeOrmModule.forFeature([ EmojiEntity, BuyEmojiEntity ]);

@Global()
@Module({
    imports: [ EMOJI_REPOSITORY ],
    controllers: [ EmojiController ],
    providers: [ EmojiService ],
    exports: [ EMOJI_REPOSITORY ]
})
export class EmojiModule {
}