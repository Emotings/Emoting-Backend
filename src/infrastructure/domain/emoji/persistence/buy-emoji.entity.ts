import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/persistence/user.entity";
import { EmojiEntity } from "./emoji.entity";

@Entity('tbl_buy_emoji')
export class BuyEmojiEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => EmojiEntity, { lazy: true })
    @JoinColumn({ name: 'emoji_id' })
    emojiId: EmojiEntity;

    @ManyToOne(() => UserEntity, { lazy: true })
    @JoinColumn({ name: 'user_id' })
    userId: UserEntity;
}