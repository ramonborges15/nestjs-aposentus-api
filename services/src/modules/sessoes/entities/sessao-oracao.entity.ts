import { Entity, PrimaryColumn } from 'typeorm';

@Entity('sessao_oracoes')
export class SessaoOracao {

    @PrimaryColumn({ name: 'sessao_id' })
    public sessaoId: number;

    @PrimaryColumn({ name: 'oracao_id' })
    public oracaoId: number;
}
