import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('telegram_integracoes')
export class TelegramIntegracao {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'user_id', type: 'uuid', unique: true })
    public userId: string;

    @Column({ name: 'telegram_user_id', type: 'varchar' })
    public telegramUserId: string;

    @Column({ name: 'telegram_chat_id', type: 'varchar' })
    public telegramChatId: string;

    @Column({ name: 'telegram_username', type: 'varchar' })
    public telegramUsername: string;

    @Column({ name: 'telegram_first_name', type: 'varchar' })
    public telegramFirstName: string;

    @Column({ type: 'boolean', default: true })
    public linked: boolean;

    @Column({ name: 'linked_at', type: 'timestamptz' })
    public linkedAt: Date;
}
