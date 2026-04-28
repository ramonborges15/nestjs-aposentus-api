import { ApiProperty } from '@nestjs/swagger';
import { Oracao } from '../entities/oracao.entity';

export class OracaoDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    criado_em: Date;

    @ApiProperty()
    atualizado_em: Date;

    @ApiProperty()
    titulo: string;

    @ApiProperty()
    conteudo: string;

    @ApiProperty()
    tema: string;

    @ApiProperty()
    tipo: string;

    @ApiProperty()
    dia_semana: number;

    @ApiProperty()
    dia_mes: number;

    @ApiProperty()
    frequencia: string;

    @ApiProperty()
    quantidade_maxima: number;

    @ApiProperty()
    total_oracoes: number;

    @ApiProperty()
    ativa: boolean;

    @ApiProperty()
    user_id: string;
}

export class OracaoListaResponseDto {

    @ApiProperty({ type: [OracaoDto] })
    data: OracaoDto[];

    @ApiProperty()
    page: number;

    @ApiProperty()
    size: number;

    @ApiProperty()
    totalItems: number;

    @ApiProperty()
    totalPages: number;
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
