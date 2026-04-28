import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { BaseBiblicaController } from './controllers/base-biblica.controller';
import { BaseBiblica } from './entities/base-biblica.entity';
import { BaseBiblicaService } from './services/base-biblica.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BaseBiblica]),
        LoggerModule.register('BaseBiblica'),
    ],
    controllers: [BaseBiblicaController],
    providers: [BaseBiblicaService],
})
export class BaseBiblicaModule { }
