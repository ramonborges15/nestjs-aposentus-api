import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum PeriodoConsulta {
    DIA = 'dia',
}

export enum OrdemConsulta {
    ASC = 'ASC',
    DESC = 'DESC',
}

export class OracaoListaQueryDto {

    @ApiPropertyOptional({ enum: PeriodoConsulta })
    @IsOptional()
    @IsEnum(PeriodoConsulta, { message: 'Período inválido. Valores aceitos: dia' })
    periodo?: PeriodoConsulta;

    @ApiPropertyOptional({ enum: OrdemConsulta })
    @IsOptional()
    @IsEnum(OrdemConsulta, { message: 'Ordenação inválida. Valores aceitos: ASC, DESC' })
    orderBy?: OrdemConsulta;
}
