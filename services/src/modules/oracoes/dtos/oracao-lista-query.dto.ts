import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { IsInt, Min } from 'class-validator';

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

    @ApiPropertyOptional({ description: 'Página atual', default: 1, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Página deve ser um número inteiro.' })
    @Min(1, { message: 'Página deve ser maior ou igual a 1.' })
    page?: number;

    @ApiPropertyOptional({ description: 'Quantidade de itens por página', default: 10, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Tamanho da página deve ser um número inteiro.' })
    @Min(1, { message: 'Tamanho da página deve ser maior ou igual a 1.' })
    size?: number;
}
