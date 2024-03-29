import { Module } from '@nestjs/common';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infrastructure/global/module/user.module';
import { AuthModule } from './infrastructure/global/module/auth.module';
import { EmojiModule } from './infrastructure/global/module/emoji.module';
import { ChatModule } from './infrastructure/global/module/chat.module';
import { EventModule } from './infrastructure/global/module/event.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        EmojiModule,
        ChatModule,
        EventModule,
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {
}
