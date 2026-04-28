import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Oracao } from 'src/modules/oracoes/entities/oracao.entity';

@Entity('sessoes')
export class Sessao {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
    public criadoEm: Date;

    @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
    public atualizadoEm: Date;

    @Column({ name: 'data_dia', type: 'date' })
    public dataDia: string;

    @Column({ type: 'boolean' })
    public finalizado: boolean;

    @Column({ name: 'finalizado_em', type: 'timestamptz', nullable: true })
    public finalizadoEm: Date | null;

    @Column({ name: 'user_id', type: 'uuid' })
    public userId: string;

    @ManyToMany(() => Oracao)
    @JoinTable({
        name: 'sessao_oracoes',
        joinColumn: { name: 'sessao_id' },
        inverseJoinColumn: { name: 'oracao_id' },
    })
    public oracoes: Oracao[];
}
