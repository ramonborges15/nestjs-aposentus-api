import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
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

    @ApiProperty()
    @IsNotEmpty({ message: 'Dia da semana é obrigatório' })
    @IsInt({ message: 'Dia da semana deve ser um número inteiro' })
    dia_semana: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Dia do mês é obrigatório' })
    @IsInt({ message: 'Dia do mês deve ser um número inteiro' })
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
