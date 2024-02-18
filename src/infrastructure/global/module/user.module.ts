import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/user/persistence/user.entity';
import { FriendApplyEntity } from "../../domain/user/persistence/friend.apply.entity";
import { FriendEntity } from "../../domain/user/persistence/friend.entity";

const USER_REPOSITORY = TypeOrmModule.forFeature([ UserEntity, FriendApplyEntity, FriendEntity ]);

@Global()
@Module({
    imports: [ USER_REPOSITORY ],
    controllers: [],
    providers: [],
    exports: [ USER_REPOSITORY ]
})
export class UserModule {
}