import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Oracao } from 'src/modules/oracoes/entities/oracao.entity';
import { LoggerService } from 'src/modules/logger/logger.service';
import { In, Repository } from 'typeorm';
import { SessaoCreateRequestDto } from '../dtos/sessao-create-request.dto';
import { Sessao } from '../entities/sessao.entity';
import { SessaoDto, SessaoViewModel } from '../view-models/sessao.view-model';

@Injectable()
export class SessoesService {

    constructor(
        private readonly loggerService: LoggerService,
        @InjectRepository(Sessao)
        private readonly sessaoRepository: Repository<Sessao>,
        @InjectRepository(Oracao)
        private readonly oracaoRepository: Repository<Oracao>,
    ) { }

    async iniciarSessao(dto: SessaoCreateRequestDto, usuarioId: string): Promise<{ data: SessaoDto[] }> {
        // Verificar se todas as orações pertencem ao usuário
        const oracoesEncontradas = await this.oracaoRepository.find({
            where: {
                id: In(dto.oracao_ids),
                userId: usuarioId,
            },
        });

        if (oracoesEncontradas.length !== dto.oracao_ids.length) {
            this.loggerService.error(`[IniciarSessao]: Uma ou mais orações não encontradas para o usuário '${usuarioId}'`);
            throw new BadRequestException('Uma ou mais orações não pertencem ao usuário ou não foram encontradas.');
        }

        const hoje = new Date();
        const dataDia = hoje.toISOString().split('T')[0]; // formato YYYY-MM-DD

        const novaSessao = this.sessaoRepository.create({
            dataDia,
            finalizado: false,
            finalizadoEm: null,
            userId: usuarioId,
            oracoes: oracoesEncontradas,
        });

        const sessaoCriada = await this.sessaoRepository.save(novaSessao);
        this.loggerService.log(`[IniciarSessao]: Sessão criada com sucesso para o usuário '${usuarioId}'.`);

        return { data: [SessaoViewModel.toDto(sessaoCriada)] };
    }

    async finalizarSessao(id: number, usuarioId: string): Promise<{ data: SessaoDto }> {
        const sessao = await this.sessaoRepository.findOne({ where: { id, userId: usuarioId } });

        if (!sessao) {
            this.loggerService.error(`[FinalizarSessao]: Sessão de id '${id}' não encontrada para o usuário '${usuarioId}'`);
            throw new NotFoundException('Sessão não encontrada.');
        }

        sessao.finalizado = true;
        sessao.finalizadoEm = new Date();

        const sessaoAtualizada = await this.sessaoRepository.save(sessao);
        this.loggerService.log(`[FinalizarSessao]: Sessão de id '${id}' finalizada com sucesso.`);

        return { data: SessaoViewModel.toDto(sessaoAtualizada) };
    }
}
