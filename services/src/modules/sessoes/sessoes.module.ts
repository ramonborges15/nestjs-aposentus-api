import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { Oracao } from '../oracoes/entities/oracao.entity';
import { SessoesController } from './controllers/sessoes.controller';
import { Sessao } from './entities/sessao.entity';
import { SessaoOracao } from './entities/sessao-oracao.entity';
import { SessoesService } from './services/sessoes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Sessao, SessaoOracao, Oracao]),
        LoggerModule.register('Sessoes'),
    ],
    controllers: [SessoesController],
    providers: [SessoesService],
    exports: [SessoesService],
})
export class SessoesModule { }
