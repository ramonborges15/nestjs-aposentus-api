import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
import { OracaoFrequencia, OracaoTipo } from 'src/modules/oracoes/entities/oracao.entity';

export class TelegramOracaoRequestDto {

    @ApiProperty({ description: 'ID do usuário no Telegram' })
    @IsNotEmpty({ message: 'ID do usuário Telegram é obrigatório' })
    @IsString({ message: 'ID do usuário Telegram deve ser uma string' })
    telegramUserId: string;

    @ApiPropertyOptional({ description: 'Título da oração' })
    @IsOptional()
    @IsString({ message: 'Título deve ser uma string' })
    titulo?: string;

    @ApiProperty({ description: 'Conteúdo da oração descrita no Telegram' })
    @IsNotEmpty({ message: 'Conteúdo da oração é obrigatório' })
    @IsString({ message: 'Conteúdo deve ser uma string' })
    conteudo: string;

    @ApiPropertyOptional({ description: 'Tema da oração' })
    @IsOptional()
    @IsString({ message: 'Tema deve ser uma string' })
    tema?: string;

    @ApiPropertyOptional({ enum: OracaoTipo, description: 'Tipo da oração' })
    @IsOptional()
    @IsEnum(OracaoTipo, { message: 'Tipo inválido. Valores aceitos: PEDIDO, INTERCESSAO, AGRADECIMENTO, CONFISSAO' })
    tipo?: OracaoTipo;

    @ApiPropertyOptional({ enum: OracaoFrequencia, description: 'Frequência da oração' })
    @IsOptional()
    @IsEnum(OracaoFrequencia, { message: 'Frequência inválida. Valores aceitos: DIARIA, SEMANAL, MENSAL' })
    frequencia?: OracaoFrequencia;

    @ApiPropertyOptional({ description: 'Quantidade máxima de vezes que a oração pode ser feita', minimum: 0 })
    @IsOptional()
    @IsInt({ message: 'Quantidade máxima deve ser um número inteiro' })
    @Min(0, { message: 'Quantidade máxima deve ser maior ou igual a zero' })
    quantidade_maxima?: number;

    @ApiPropertyOptional({ description: 'Dia da semana para orações semanais (0=Domingo, 6=Sábado)', minimum: 0, maximum: 6 })
    @IsOptional()
    @IsInt({ message: 'Dia da semana deve ser um número inteiro' })
    @Min(0, { message: 'Dia da semana deve ser entre 0 e 6' })
    @Max(6, { message: 'Dia da semana deve ser entre 0 e 6' })
    dia_semana?: number;

    @ApiPropertyOptional({ description: 'Dia do mês para orações mensais (1-31)', minimum: 1, maximum: 31 })
    @IsOptional()
    @IsInt({ message: 'Dia do mês deve ser um número inteiro' })
    @Min(1, { message: 'Dia do mês deve ser entre 1 e 31' })
    @Max(31, { message: 'Dia do mês deve ser entre 1 e 31' })
    dia_mes?: number;
}
