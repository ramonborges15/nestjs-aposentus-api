import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum OracaoTipo {
    PEDIDO = 'PEDIDO',
    INTERCESSAO = 'INTERCESSAO',
    AGRADECIMENTO = 'AGRADECIMENTO',
    CONFISSAO = 'CONFISSAO',
}

export enum OracaoFrequencia {
    DIARIA = 'DIARIA',
    SEMANAL = 'SEMANAL',
    MENSAL = 'MENSAL',
}

@Entity('oracoes')
export class Oracao {

    @PrimaryGeneratedColumn()
    public id: number;

    @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
    public criadoEm: Date;

    @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
    public atualizadoEm: Date;

    @DeleteDateColumn({ name: 'excluido_em', type: 'timestamptz', nullable: true })
    public excluidoEm: Date;

    @Column({ type: 'varchar' })
    public titulo: string;

    @Column({ type: 'text' })
    public conteudo: string;

    @Column({ type: 'varchar' })
    public tema: string;

    @Column({ type: 'enum', enum: OracaoTipo })
    public tipo: OracaoTipo;

    @Column({ name: 'dia_semana', type: 'int' })
    public diaSemana: number;

    @Column({ name: 'dia_mes', type: 'int' })
    public diaMes: number;

    @Column({ type: 'enum', enum: OracaoFrequencia })
    public frequencia: OracaoFrequencia;

    @Column({ name: 'quantidade_maxima', type: 'int', default: 0 })
    public quantidadeMaxima: number;

    @Column({ name: 'total_oracoes', type: 'int', default: 0 })
    public totalOracoes: number;

    @Column({ type: 'boolean' })
    public ativa: boolean;

    @Column({ name: 'user_id', type: 'uuid' })
    public userId: string;
}
