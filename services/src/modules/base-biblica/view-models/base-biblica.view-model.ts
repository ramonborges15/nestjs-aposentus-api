import { BaseBiblica } from '../entities/base-biblica.entity';

export interface BaseBiblicaDto {
    id: number;
    criado_em: Date;
    atualizado_em: Date;
    referencia: string | null;
    tema: string[];
    texto: string;
}

export class BaseBiblicaViewModel {

    static toDto(baseBiblica: BaseBiblica): BaseBiblicaDto {
        return {
            id: baseBiblica.id,
            criado_em: baseBiblica.criadoEm,
            atualizado_em: baseBiblica.atualizadoEm,
            referencia: baseBiblica.referencia,
            tema: baseBiblica.tema,
            texto: baseBiblica.texto,
        };
    }
}
