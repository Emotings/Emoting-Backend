import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/persistence/user.entity";

@Entity('tbl_emoji')
export class EmojiEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 50, nullable: false })
    title: string;

    @Column('varchar', { length: 1000, nullable: false })
    content: string;

    @Column('int', { nullable: false, default: 0 })
    price: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    userId: string;
}