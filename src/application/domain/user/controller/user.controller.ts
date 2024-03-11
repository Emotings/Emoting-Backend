import { Controller, Get, Param, Patch, Post, Query, UseFilters, UseGuards } from "@nestjs/common";
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
    @Patch('apply/:id')
    async applyFriend(@Param() id, @CurrentUser() user: UserEntity) {
        await this.userService.applyFriend(id, user)
    }

    @UseGuards(AuthGuard())
    @Get('apply')
    async queryApplyFriend(@CurrentUser() user: UserEntity) {
        return await this.userService.queryApplyFriend(user)
    }

    @UseGuards(AuthGuard())
    @Get('friend')
    async queryFriend(@CurrentUser() user: UserEntity) {
        return await this.userService.queryFriend(user)
    }

    @Get('search')
    async searchUser(@Query('keyword') keyword: string) {
        return await this.userService.searchUser(keyword)
    }

    @UseGuards(AuthGuard())
    @Post('status/:id')
    async updateApplyStatus(@Param() id, @Query('status') status, @CurrentUser() user: UserEntity) {
        await this.userService.updateApplyStatus(id, status, user)
    }

    @UseGuards(AuthGuard())
    @Patch('notification')
    async updateIsTurnOn(@Query('is-turn-on') isTurnOn: boolean, @CurrentUser() user: UserEntity) {
        await this.userService.notificationOnOff(isTurnOn, user)
    }
}