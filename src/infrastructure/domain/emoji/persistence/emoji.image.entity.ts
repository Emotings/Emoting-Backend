import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmojiEntity } from "./emoji.entity";

@Entity('tbl_emoji_image')
export class EmojiImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 3000, nullable: false })
    image: string;

    @ManyToOne(() => EmojiEntity)
    @JoinColumn({ name: 'emoji_id' })
    emojiId: string;
}