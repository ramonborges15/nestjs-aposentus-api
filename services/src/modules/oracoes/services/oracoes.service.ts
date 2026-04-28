import { Injectable, NotImplementedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/modules/logger/logger.service';
import { Repository } from 'typeorm';
import { OracaoGerarPorIARequestDto } from '../dtos/oracao-gerar-por-ia-request.dto';
import { OracaoListaQueryDto } from '../dtos/oracao-lista-query.dto';
import { OracaoUpsertRequestDto } from '../dtos/oracao-upsert-request.dto';
import { Oracao } from '../entities/oracao.entity';
import { OracaoDto, OracaoViewModel } from '../view-models/oracao.view-model';

@Injectable()
export class OracoesService {

    constructor(
        private readonly loggerService: LoggerService,
        @InjectRepository(Oracao)
        private readonly oracaoRepository: Repository<Oracao>,
    ) { }

    async buscarPorId(id: number, usuarioId: string): Promise<{ data: OracaoDto }> {
        const oracao = await this.oracaoRepository.findOne({ where: { id, userId: usuarioId } });

        if (!oracao) {
            this.loggerService.error(`[BuscarPorId]: Oração de id '${id}' não encontrada para o usuário '${usuarioId}'`);
            throw new NotFoundException('Oração não encontrada.');
        }

        return { data: OracaoViewModel.toDto(oracao) };
    }

    async editar(id: number, usuarioId: string, dto: OracaoUpsertRequestDto): Promise<{ data: OracaoDto }> {
        const oracao = await this.oracaoRepository.findOne({ where: { id, userId: usuarioId } });

        if (!oracao) {
            this.loggerService.error(`[Editar]: Oração de id '${id}' não encontrada para o usuário '${usuarioId}'`);
            throw new NotFoundException('Oração não encontrada.');
        }

        this.aplicarDtoNaOracao(oracao, dto);

        const oracaoAtualizada = await this.oracaoRepository.save(oracao);
        this.loggerService.log(`[Editar]: Oração de id '${id}' atualizada com sucesso.`);

        return { data: OracaoViewModel.toDto(oracaoAtualizada) };
    }

    async excluir(id: number, usuarioId: string): Promise<void> {
        const oracao = await this.oracaoRepository.findOne({ where: { id, userId: usuarioId } });

        if (!oracao) {
            this.loggerService.error(`[Excluir]: Oração de id '${id}' não encontrada para o usuário '${usuarioId}'`);
            throw new NotFoundException('Oração não encontrada.');
        }

        await this.oracaoRepository.softDelete(id);
        this.loggerService.log(`[Excluir]: Oração de id '${id}' excluída com sucesso.`);
    }

    // TODO: implementar regra de negócio de listagem
    async listar(query: OracaoListaQueryDto, usuarioId: string): Promise<{ data: OracaoDto[]; page: number; size: number; totalItems: number; totalPages: number }> {
        throw new NotImplementedException('Listagem não implementada');
    }

    async criar(dto: OracaoUpsertRequestDto, usuarioId: string): Promise<{ data: OracaoDto }> {
        const novaOracao = this.oracaoRepository.create({
            totalOracoes: 0,
            ativa: true,
            userId: usuarioId,
        });

        this.aplicarDtoNaOracao(novaOracao, dto);

        const oracaoCriada = await this.oracaoRepository.save(novaOracao);
        this.loggerService.log(`[Criar]: Oração criada com sucesso para o usuário '${usuarioId}'.`);

        return { data: OracaoViewModel.toDto(oracaoCriada) };
    }

    private aplicarDtoNaOracao(oracao: Oracao, dto: OracaoUpsertRequestDto): void {
        oracao.titulo = dto.titulo;
        oracao.conteudo = dto.conteudo;
        oracao.tema = dto.tema;
        oracao.tipo = dto.tipo;
        oracao.diaSemana = dto.dia_semana;
        oracao.diaMes = dto.dia_mes;
        oracao.frequencia = dto.frequencia;

        if (dto.quantidade_maxima !== undefined) {
            oracao.quantidadeMaxima = dto.quantidade_maxima;
        }
    }

    // TODO: implementar listener de geração por IA
    async gerarPorIa(dto: OracaoGerarPorIARequestDto, usuarioId: string): Promise<{ data: { mensagem: string } }> {
        this.loggerService.log(`[GerarPorIA]: Processo de geração por IA iniciado para o usuário '${usuarioId}'.`);
        return { data: { mensagem: 'Processo de geração iniciado. Aguarde.' } };
    }

    // TODO: implementar listener de geração por IA
    async gerarNovaVersaoPorIa(id: number, dto: OracaoGerarPorIARequestDto, usuarioId: string): Promise<{ data: { mensagem: string } }> {
        const oracao = await this.oracaoRepository.findOne({ where: { id, userId: usuarioId } });

        if (!oracao) {
            this.loggerService.error(`[GerarNovaVersaoPorIA]: Oração de id '${id}' não encontrada para o usuário '${usuarioId}'`);
            throw new NotFoundException('Oração não encontrada.');
        }

        this.loggerService.log(`[GerarNovaVersaoPorIA]: Processo de geração por IA iniciado para a oração '${id}' do usuário '${usuarioId}'.`);
        return { data: { mensagem: 'Processo de geração iniciado. Aguarde.' } };
    }

    async registrarEvento(id: number, usuarioId: string): Promise<{ data: { registrado_em: Date } }> {
        const oracao = await this.oracaoRepository.findOne({ where: { id, userId: usuarioId } });

        if (!oracao) {
            this.loggerService.error(`[RegistrarEvento]: Oração de id '${id}' não encontrada para o usuário '${usuarioId}'`);
            throw new NotFoundException('Oração não encontrada.');
        }

        oracao.totalOracoes += 1;
        await this.oracaoRepository.save(oracao);

        const registradoEm = new Date();
        this.loggerService.log(`[RegistrarEvento]: Evento registrado para a oração '${id}' do usuário '${usuarioId}'.`);

        return { data: { registrado_em: registradoEm } };
    }
}
