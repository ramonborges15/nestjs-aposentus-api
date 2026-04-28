import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { OracoesController } from './controllers/oracoes.controller';
import { Oracao } from './entities/oracao.entity';
import { OracoesService } from './services/oracoes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Oracao]),
        LoggerModule.register('Oracoes'),
    ],
    controllers: [OracoesController],
    providers: [OracoesService],
})
export class OracoesModule { }
