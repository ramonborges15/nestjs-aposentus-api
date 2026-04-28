import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class TelegramLinkDataDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'Código é obrigatório' })
    @IsString({ message: 'Código deve ser uma string' })
    code: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'ID do usuário Telegram é obrigatório' })
    @IsString({ message: 'ID do usuário Telegram deve ser uma string' })
    telegramUserId: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'ID do chat Telegram é obrigatório' })
    @IsString({ message: 'ID do chat Telegram deve ser uma string' })
    telegramChatId: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Username do Telegram é obrigatório' })
    @IsString({ message: 'Username do Telegram deve ser uma string' })
    telegramUsername: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Primeiro nome do Telegram é obrigatório' })
    @IsString({ message: 'Primeiro nome do Telegram deve ser uma string' })
    telegramFirstName: string;
}

export class TelegramLinkRequestDto {

    @ApiProperty({ type: () => TelegramLinkDataDto })
    @IsNotEmpty({ message: 'Dados são obrigatórios' })
    @ValidateNested()
    @Type(() => TelegramLinkDataDto)
    data: TelegramLinkDataDto;
}
