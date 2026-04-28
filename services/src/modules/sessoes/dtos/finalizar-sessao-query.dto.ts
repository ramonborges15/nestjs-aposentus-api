import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum EventoSessao {
    FINALIZAR = 'finalizar',
}

export class FinalizarSessaoQueryDto {

    @ApiProperty({ enum: EventoSessao, description: 'Evento a ser executado na sessão' })
    @IsEnum(EventoSessao)
    public evento: EventoSessao;
}
