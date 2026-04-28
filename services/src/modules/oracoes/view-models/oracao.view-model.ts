import { Oracao } from '../entities/oracao.entity';

export interface OracaoDto {
    id: number;
    criado_em: Date;
    atualizado_em: Date;
    titulo: string;
    conteudo: string;
    tema: string;
    tipo: string;
    dia_semana: number;
    dia_mes: number;
    frequencia: string;
    quantidade_maxima: number;
    total_oracoes: number;
    ativa: boolean;
    user_id: string;
}

export class OracaoViewModel {

    static toDto(oracao: Oracao): OracaoDto {
        return {
            id: oracao.id,
            criado_em: oracao.criadoEm,
            atualizado_em: oracao.atualizadoEm,
            titulo: oracao.titulo,
            conteudo: oracao.conteudo,
            tema: oracao.tema,
            tipo: oracao.tipo,
            dia_semana: oracao.diaSemana,
            dia_mes: oracao.diaMes,
            frequencia: oracao.frequencia,
            quantidade_maxima: oracao.quantidadeMaxima,
            total_oracoes: oracao.totalOracoes,
            ativa: oracao.ativa,
            user_id: oracao.userId,
        };
    }
}
