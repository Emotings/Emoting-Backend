import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/user/persistence/user.entity';
import { FriendApplyEntity } from "../../domain/user/persistence/friend.apply.entity";
import { FriendEntity } from "../../domain/user/persistence/friend.entity";
import { UserController } from "../../../application/domain/user/controller/user.controller";
import { UserService } from "../../../application/domain/user/service/user.service";

const USER_REPOSITORY = TypeOrmModule.forFeature([ UserEntity, FriendApplyEntity, FriendEntity ]);

@Global()
@Module({
    imports: [ USER_REPOSITORY ],
    controllers: [ UserController ],
    providers: [ UserService ],
    exports: [ USER_REPOSITORY ]
})
export class UserModule {
}