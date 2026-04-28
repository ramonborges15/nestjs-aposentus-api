import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { OracaoFrequencia, OracaoTipo } from '../entities/oracao.entity';

export class OracaoUpsertRequestDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Título é obrigatório' })
    @IsString({ message: 'Título deve ser uma string' })
    titulo: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Conteúdo é obrigatório' })
    @IsString({ message: 'Conteúdo deve ser uma string' })
    conteudo: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Tema é obrigatório' })
    @IsString({ message: 'Tema deve ser uma string' })
    tema: string;

    @ApiProperty({ enum: OracaoTipo })
    @IsNotEmpty({ message: 'Tipo é obrigatório' })
    @IsEnum(OracaoTipo, { message: 'Tipo inválido. Valores aceitos: PEDIDO, INTERCESSAO, AGRADECIMENTO, CONFISSAO' })
    tipo: OracaoTipo;

    @ApiProperty({ minimum: 0, maximum: 6 })
    @IsNotEmpty({ message: 'Dia da semana é obrigatório' })
    @IsInt({ message: 'Dia da semana deve ser um número inteiro' })
    @Min(0, { message: 'Dia da semana deve ser entre 0 e 6' })
    @Max(6, { message: 'Dia da semana deve ser entre 0 e 6' })
    dia_semana: number;

    @ApiProperty({ minimum: 1, maximum: 31 })
    @IsNotEmpty({ message: 'Dia do mês é obrigatório' })
    @IsInt({ message: 'Dia do mês deve ser um número inteiro' })
    @Min(1, { message: 'Dia do mês deve ser entre 1 e 31' })
    @Max(31, { message: 'Dia do mês deve ser entre 1 e 31' })
    dia_mes: number;

    @ApiProperty({ enum: OracaoFrequencia })
    @IsNotEmpty({ message: 'Frequência é obrigatória' })
    @IsEnum(OracaoFrequencia, { message: 'Frequência inválida. Valores aceitos: DIARIA, SEMANAL, MENSAL' })
    frequencia: OracaoFrequencia;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt({ message: 'Quantidade máxima deve ser um número inteiro' })
    @Min(0, { message: 'Quantidade máxima deve ser maior ou igual a zero' })
    quantidade_maxima?: number;
}
