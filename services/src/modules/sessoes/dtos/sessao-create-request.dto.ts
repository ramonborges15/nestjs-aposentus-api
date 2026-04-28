import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt } from 'class-validator';

export class SessaoCreateRequestDto {

    @ApiProperty({ name: 'oracao_ids', type: [Number], description: 'IDs das orações da sessão' })
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @Type(() => Number)
    public oracao_ids: number[];
}
