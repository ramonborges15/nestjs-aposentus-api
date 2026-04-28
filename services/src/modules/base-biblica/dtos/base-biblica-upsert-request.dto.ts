import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BaseBiblicaUpsertRequestDto {

    @ApiPropertyOptional({ nullable: true })
    @IsOptional()
    @IsString({ message: 'Referência deve ser uma string' })
    referencia?: string | null;

    @ApiProperty({ type: [String] })
    @IsNotEmpty({ message: 'Tema é obrigatório' })
    @IsArray({ message: 'Tema deve ser um array' })
    @IsString({ each: true, message: 'Cada item do tema deve ser uma string' })
    @ArrayMinSize(1, { message: 'Tema deve conter ao menos um item' })
    tema: string[];

    @ApiProperty()
    @IsNotEmpty({ message: 'Texto é obrigatório' })
    @IsString({ message: 'Texto deve ser uma string' })
    texto: string;
}
