import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseFilters, UseGuards } from "@nestjs/common";
import { GlobalExceptionFilter } from "../../../../infrastructure/global/filter/global.exception.filter";
import { EmojiService } from "../service/emoji.service";
import { CurrentUser } from "../../../../infrastructure/global/decorator/current-user";
import { UserEntity } from "../../../../infrastructure/domain/user/persistence/user.entity";
import { CreateEmojiRequest } from "../dto/emoji.dto";
import { AuthGuard } from "@nestjs/passport";

@UseFilters(GlobalExceptionFilter)
@Controller('emoji')
export class EmojiController {
    constructor(
        private emojiService: EmojiService
    ) {
    }

    @UseGuards(AuthGuard())
    @Post()
    async createEmoji(@CurrentUser() user: UserEntity, @Body() request: CreateEmojiRequest) {
        await this.emojiService.createEmoji(user, request)
    }

    @Get('all')
    async queryEmojiAll() {
        return this.emojiService.queryEmojiAll()
    }

    @Get()
    async queryEmojiFilter(@Query('min') min: number, @Query('max') max: number) {
        return await this.emojiService.queryEmojiFilter(min, max)
    }

    @UseGuards(AuthGuard())
    @Post('buy/:id')
    async buyEmoji(@CurrentUser() user: UserEntity, @Param() id) {
        await this.emojiService.buyEmoji(user, id)
    }

    @Post('upload/:id')
    async uploadEmojiImage(@Param() id, @UploadedFile('file') file: Express.Multer.File) {
        return await this.emojiService.uploadEmojiImage(id, file)
    }
}