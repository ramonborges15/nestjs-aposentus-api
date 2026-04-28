import { Sessao } from '../entities/sessao.entity';

export interface SessaoDto {
    id: number;
    criado_em: Date;
    atualizado_em: Date;
    finalizado_em: Date | null;
    data_dia: string;
    finalizado: boolean;
}

export class SessaoViewModel {

    static toDto(sessao: Sessao): SessaoDto {
        return {
            id: sessao.id,
            criado_em: sessao.criadoEm,
            atualizado_em: sessao.atualizadoEm,
            finalizado_em: sessao.finalizadoEm ?? null,
            data_dia: sessao.dataDia,
            finalizado: sessao.finalizado,
        };
    }
}
