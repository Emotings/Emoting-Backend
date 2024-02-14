import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/user/persistence/user.entity';

const USER_REPOSITORY = TypeOrmModule.forFeature([UserEntity]);

@Global()
@Module({
    imports: [USER_REPOSITORY],
    controllers: [],
    providers: [],
    exports: [USER_REPOSITORY]
})
export class UserModule {
}