import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('sessao_oracoes')
export class SessaoOracao {

    @PrimaryColumn({ name: 'sessao_id' })
    public sessaoId: number;

    @PrimaryColumn({ name: 'oracao_id' })
    public oracaoId: number;

    @Column({ name: 'feito_em', type: 'timestamptz', nullable: true })
    public feitoEm: Date | null;
}
