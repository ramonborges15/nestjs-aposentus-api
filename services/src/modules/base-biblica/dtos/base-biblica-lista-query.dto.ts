import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class BaseBiblicaListaQueryDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ message: 'Tema deve ser uma string' })
    tema?: string;

    @ApiPropertyOptional({ default: 1, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Página deve ser um número inteiro' })
    @Min(1, { message: 'Página deve ser maior ou igual a 1' })
    page?: number;

    @ApiPropertyOptional({ default: 10, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'Tamanho deve ser um número inteiro' })
    @Min(1, { message: 'Tamanho deve ser maior ou igual a 1' })
    size?: number;
}
