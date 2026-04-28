import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('base_biblica')
export class BaseBiblica {

    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
    public criadoEm: Date;

    @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
    public atualizadoEm: Date;

    @Column({ type: 'varchar', nullable: true })
    public referencia: string | null;

    @Column({ type: 'text', array: true })
    public tema: string[];

    @Column({ type: 'text' })
    public texto: string;
}
