import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/modules/logger/logger.service';
import { Repository } from 'typeorm';
import { TelegramLinkRequestDto } from '../dtos/telegram-link-request.dto';
import { TelegramCodigoLink } from '../entities/telegram-codigo-link.entity';
import { TelegramIntegracao } from '../entities/telegram-integracao.entity';
import {
    TelegramCodigoLinkResponse,
    TelegramLinkResponse,
    TelegramRevokeResponse,
    TelegramStatusResponse,
} from '../view-models/telegram.view-model';

@Injectable()
export class IntegracoesTelegramService {

    constructor(
        private readonly loggerService: LoggerService,
        @InjectRepository(TelegramIntegracao)
        private readonly telegramIntegracaoRepository: Repository<TelegramIntegracao>,
        @InjectRepository(TelegramCodigoLink)
        private readonly telegramCodigoLinkRepository: Repository<TelegramCodigoLink>,
    ) { }

    // TODO: implementar geração de código temporário para vinculação Telegram
    async gerarCodigoLink(usuarioId: string): Promise<TelegramCodigoLinkResponse> {
        throw new NotImplementedException('Geração de código não implementada');
    }

    // TODO: implementar consumo de código e vinculação da conta Telegram
    async vincularConta(dto: TelegramLinkRequestDto): Promise<TelegramLinkResponse> {
        throw new NotImplementedException('Vinculação de conta não implementada');
    }

    // TODO: implementar consulta de status de integração Telegram
    async consultarStatus(usuarioId: string): Promise<TelegramStatusResponse> {
        throw new NotImplementedException('Consulta de status não implementada');
    }

    // TODO: implementar revogação de vinculação Telegram
    async revogarVinculo(usuarioId: string): Promise<TelegramRevokeResponse> {
        throw new NotImplementedException('Revogação de vinculação não implementada');
    }
}
