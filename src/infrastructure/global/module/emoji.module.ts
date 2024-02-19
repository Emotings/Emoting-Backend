import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmojiEntity } from "../../domain/emoji/persistence/emoji.entity";
import { EmojiImageEntity } from "../../domain/emoji/persistence/emoji.image.entity";

const EMOJI_REPOSITORY = TypeOrmModule.forFeature([ EmojiEntity, EmojiImageEntity ]);

@Global()
@Module({
    imports: [ EMOJI_REPOSITORY ],
    controllers: [],
    providers: [],
    exports: [ EMOJI_REPOSITORY ]
})
export class EmojiModule {
}