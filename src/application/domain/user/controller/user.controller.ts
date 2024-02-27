import { Controller, Param, Post, Req, UseFilters, UseGuards } from "@nestjs/common";
import { GlobalExceptionFilter } from "../../../../infrastructure/global/filter/global.exception.filter";
import { UserService } from "../service/user.service";
import { AuthGuard } from "@nestjs/passport";

@UseFilters(GlobalExceptionFilter)
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {
    }

    @UseGuards(AuthGuard())
    @Post('apply/:id')
    async applyFriend(@Req() req) {
        await this.userService.applyFriend(req)
    }
}