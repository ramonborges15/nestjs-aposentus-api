import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
