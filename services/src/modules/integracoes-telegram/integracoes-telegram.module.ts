import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { Oracao } from '../oracoes/entities/oracao.entity';
import {
    IntegracoesTelegramPublicoController,
    MeIntegracoesTelegramController,
} from './controllers/integracoes-telegram.controller';
import { TelegramCodigoLink } from './entities/telegram-codigo-link.entity';
import { TelegramIntegracao } from './entities/telegram-integracao.entity';
import { IntegracoesTelegramService } from './services/integracoes-telegram.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TelegramIntegracao, TelegramCodigoLink, Oracao]),
        LoggerModule.register('IntegracoesTelegram'),
    ],
    controllers: [MeIntegracoesTelegramController, IntegracoesTelegramPublicoController],
    providers: [IntegracoesTelegramService],
})
export class IntegracoesTelegramModule { }
