import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TelegramIniciarSessaoRequestDto {

    @ApiProperty({ description: 'ID do usuário no Telegram' })
    @IsNotEmpty({ message: 'ID do usuário Telegram é obrigatório' })
    @IsString({ message: 'ID do usuário Telegram deve ser uma string' })
    telegramUserId: string;

    @ApiPropertyOptional({
        description: 'IDs das orações da sessão. Se não informado, utiliza todas as orações do dia.',
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number)
    oracao_ids?: number[];
}
