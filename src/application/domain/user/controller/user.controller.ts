import { Controller, Get, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { GlobalExceptionFilter } from "../../../../infrastructure/global/filter/global.exception.filter";
import { UserService } from "../service/user.service";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../../../../infrastructure/global/decorator/current-user";
import { UserEntity } from "../../../../infrastructure/domain/user/persistence/user.entity";

@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {
    }

    @UseGuards(AuthGuard())
    @Post('apply/:id')
    async applyFriend(@Param() id, @CurrentUser() user: UserEntity) {
        await this.userService.applyFriend(id, user)
    }

    @UseGuards(AuthGuard())
    @Get('apply')
    async queryApplyFriend(@CurrentUser() user: UserEntity) {
        return await this.userService.queryApplyFriend(user)
    }
}