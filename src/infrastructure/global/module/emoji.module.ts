import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmojiEntity } from "../../domain/emoji/persistence/emoji.entity";
import { EmojiService } from "../../../application/domain/emoji/service/emoji.service";
import { EmojiController } from "../../../application/domain/emoji/controller/emoji.controller";

const EMOJI_REPOSITORY = TypeOrmModule.forFeature([ EmojiEntity ]);

@Global()
@Module({
    imports: [ EMOJI_REPOSITORY ],
    controllers: [ EmojiController ],
    providers: [ EmojiService ],
    exports: [ EMOJI_REPOSITORY ]
})
export class EmojiModule {
}