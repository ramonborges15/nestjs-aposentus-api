import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import {
    IntegracoesTelegramPublicoController,
    MeIntegracoesTelegramController,
} from './controllers/integracoes-telegram.controller';
import { TelegramCodigoLink } from './entities/telegram-codigo-link.entity';
import { TelegramIntegracao } from './entities/telegram-integracao.entity';
import { IntegracoesTelegramService } from './services/integracoes-telegram.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TelegramIntegracao, TelegramCodigoLink]),
        LoggerModule.register('IntegracoesTelegram'),
    ],
    controllers: [MeIntegracoesTelegramController, IntegracoesTelegramPublicoController],
    providers: [IntegracoesTelegramService],
})
export class IntegracoesTelegramModule { }
