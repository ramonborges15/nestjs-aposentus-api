import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';
import { OracaoFrequencia } from '../entities/oracao.entity';

export class TextoBiblicoDto {

    @ApiPropertyOptional({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Referência deve ser uma string' })
    referencia?: string | null;

    @ApiProperty()
    @IsNotEmpty({ message: 'Texto bíblico é obrigatório' })
    @IsString({ message: 'Texto bíblico deve ser uma string' })
    texto: string;
}

export class OracaoGerarPorIARequestDto {

    @ApiProperty({ type: [TextoBiblicoDto], minItems: 1 })
    @ArrayMinSize(1, { message: 'É necessário pelo menos um texto bíblico' })
    @ValidateNested({ each: true })
    @Type(() => TextoBiblicoDto)
    textos_biblicos: TextoBiblicoDto[];

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
