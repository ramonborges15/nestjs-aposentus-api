import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('telegram_codigos_link')
export class TelegramCodigoLink {

    @PrimaryColumn({ type: 'varchar' })
    public code: string;

    @Column({ name: 'user_id', type: 'uuid' })
    public userId: string;

    @Column({ name: 'expires_at', type: 'timestamptz' })
    public expiresAt: Date;
}
