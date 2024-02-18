import { Module } from '@nestjs/common';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infrastructure/global/module/user.module';
import { AuthModule } from './infrastructure/global/module/auth.module';
import { ChatModule } from './infrastructure/global/module/chat.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ChatModule,
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {
}
