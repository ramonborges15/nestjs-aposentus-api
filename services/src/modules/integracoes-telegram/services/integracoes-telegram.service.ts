import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { LoggerService } from 'src/modules/logger/logger.service';
import { Oracao, OracaoFrequencia, OracaoTipo } from 'src/modules/oracoes/entities/oracao.entity';
import { OracaoDto, OracaoListaResponseDto, OracaoViewModel } from 'src/modules/oracoes/view-models/oracao.view-model';
import { SessoesService } from 'src/modules/sessoes/services/sessoes.service';
import { SessaoDto } from 'src/modules/sessoes/view-models/sessao.view-model';
import { Repository } from 'typeorm';
import { TelegramIniciarSessaoRequestDto } from '../dtos/telegram-iniciar-sessao-request.dto';
import { TelegramLinkRequestDto } from '../dtos/telegram-link-request.dto';
import { TelegramOracaoRequestDto } from '../dtos/telegram-oracao-request.dto';
import { TelegramCodigoLink } from '../entities/telegram-codigo-link.entity';
import { TelegramIntegracao } from '../entities/telegram-integracao.entity';
import {
    TelegramCodigoLinkResponse,
    TelegramLinkResponse,
    TelegramRevokeResponse,
    TelegramStatusResponse,
    TelegramViewModel,
} from '../view-models/telegram.view-model';

const TEMA_PADRAO_TELEGRAM = 'telegram';
const TITULO_PADRAO_ORACAO_TELEGRAM = 'Oração via Telegram';
const DIA_SEMANA_PADRAO = 0;
const DIA_MES_PADRAO = 1;
const QUANTIDADE_MAXIMA_SEM_LIMITE = 0;

@Injectable()
export class IntegracoesTelegramService {

    private readonly EXPIRACAO_CODIGO_MINUTOS = 15;
    private readonly telegramBotUsername: string;

    constructor(
        private readonly loggerService: LoggerService,
        private readonly configService: ConfigService,
        private readonly sessoesService: SessoesService,
        @InjectRepository(TelegramIntegracao)
        private readonly telegramIntegracaoRepository: Repository<TelegramIntegracao>,
        @InjectRepository(TelegramCodigoLink)
        private readonly telegramCodigoLinkRepository: Repository<TelegramCodigoLink>,
        @InjectRepository(Oracao)
        private readonly oracaoRepository: Repository<Oracao>,
    ) {
        this.telegramBotUsername = this.configService.get<string>('TELEGRAM_BOT_USERNAME', 'aposentus_bot');
    }

    async gerarCodigoLink(usuarioId: string): Promise<TelegramCodigoLinkResponse> {
        const codigo = randomBytes(4).toString('hex').toUpperCase();
        const expiracao = new Date();
        expiracao.setMinutes(expiracao.getMinutes() + this.EXPIRACAO_CODIGO_MINUTOS);

        await this.telegramCodigoLinkRepository.delete({ userId: usuarioId });

        const codigoLink = this.telegramCodigoLinkRepository.create({
            code: codigo,
            userId: usuarioId,
            expiresAt: expiracao,
        });
        await this.telegramCodigoLinkRepository.save(codigoLink);

        const deepLinkUrl = `https://t.me/${this.telegramBotUsername}?start=${codigo}`;
        this.loggerService.log(`[GerarCodigoLink]: Código gerado para o usuário '${usuarioId}'.`);

        return TelegramViewModel.toCodigoLinkDto(codigo, expiracao, deepLinkUrl);
    }

    async vincularConta(dto: TelegramLinkRequestDto): Promise<TelegramLinkResponse> {
        const codigoLink = await this.telegramCodigoLinkRepository.findOne({ where: { code: dto.data.code } });

        if (!codigoLink) {
            throw new BadRequestException('Código inválido ou expirado.');
        }

        if (codigoLink.expiresAt < new Date()) {
            await this.telegramCodigoLinkRepository.delete({ code: dto.data.code });
            throw new BadRequestException('Código expirado.');
        }

        let integracao = await this.telegramIntegracaoRepository.findOne({ where: { userId: codigoLink.userId } });

        if (!integracao) {
            integracao = this.telegramIntegracaoRepository.create({ userId: codigoLink.userId });
        }

        integracao.telegramUserId = dto.data.telegramUserId;
        integracao.telegramChatId = dto.data.telegramChatId;
        integracao.telegramUsername = dto.data.telegramUsername;
        integracao.telegramFirstName = dto.data.telegramFirstName;
        integracao.linked = true;
        integracao.linkedAt = new Date();

        await this.telegramIntegracaoRepository.save(integracao);
        await this.telegramCodigoLinkRepository.delete({ code: dto.data.code });

        this.loggerService.log(`[VincularConta]: Conta Telegram vinculada para o usuário '${codigoLink.userId}'.`);

        return TelegramViewModel.toLinkResponseDto(true, 'Conta vinculada com sucesso.');
    }

    async consultarStatus(usuarioId: string): Promise<TelegramStatusResponse> {
        const integracao = await this.telegramIntegracaoRepository.findOne({ where: { userId: usuarioId } });

        if (!integracao || !integracao.linked) {
            return TelegramViewModel.toStatusDto(false, '', '', null);
        }

        return TelegramViewModel.toStatusDto(
            integracao.linked,
            integracao.telegramUserId,
            integracao.telegramUsername,
            integracao.linkedAt,
        );
    }

    async revogarVinculo(usuarioId: string): Promise<TelegramRevokeResponse> {
        const integracao = await this.telegramIntegracaoRepository.findOne({ where: { userId: usuarioId } });

        if (!integracao) {
            throw new NotFoundException('Integração com Telegram não encontrada.');
        }

        integracao.linked = false;
        await this.telegramIntegracaoRepository.save(integracao);

        this.loggerService.log(`[RevogarVinculo]: Vinculação Telegram revogada para o usuário '${usuarioId}'.`);

        return TelegramViewModel.toRevokeDto(true);
    }

    async adicionarOracaoViaTelegram(dto: TelegramOracaoRequestDto): Promise<{ data: OracaoDto }> {
        const integracao = await this.telegramIntegracaoRepository.findOne({
            where: { telegramUserId: dto.telegramUserId, linked: true },
        });

        if (!integracao) {
            throw new NotFoundException('Conta Telegram não vinculada a nenhum usuário.');
        }

        const frequencia = dto.frequencia ?? OracaoFrequencia.DIARIA;

        const novaOracao = this.oracaoRepository.create({
            titulo: dto.titulo ?? TITULO_PADRAO_ORACAO_TELEGRAM,
            conteudo: dto.conteudo,
            tema: dto.tema ?? TEMA_PADRAO_TELEGRAM,
            tipo: dto.tipo ?? OracaoTipo.PEDIDO,
            diaSemana: this.resolverDiaSemanaParao(frequencia, dto.dia_semana),
            diaMes: this.resolverDiaMesParao(frequencia, dto.dia_mes),
            frequencia,
            quantidadeMaxima: dto.quantidade_maxima ?? QUANTIDADE_MAXIMA_SEM_LIMITE,
            totalOracoes: 0,
            ativa: true,
            userId: integracao.userId,
        });

        const oracaoCriada = await this.oracaoRepository.save(novaOracao);
        this.loggerService.log(`[AdicionarOracaoViaTelegram]: Oração criada para o usuário '${integracao.userId}'.`);

        return { data: OracaoViewModel.toDto(oracaoCriada) };
    }

    async listarOracoesHojeViaTelegram(telegramUserId: string): Promise<OracaoListaResponseDto> {
        const integracao = await this.telegramIntegracaoRepository.findOne({
            where: { telegramUserId, linked: true },
        });

        if (!integracao) {
            throw new NotFoundException('Conta Telegram não vinculada a nenhum usuário.');
        }

        const hoje = new Date();
        const diaSemanaAtual = hoje.getDay();
        const diaMesAtual = hoje.getDate();
        const dataAtual = hoje.toISOString().split('T')[0];

        const { entities } = await this.oracaoRepository.createQueryBuilder('oracao')
            .where('oracao.user_id = :usuarioId', { usuarioId: integracao.userId })
            .andWhere('oracao.ativa = true')
            .andWhere(
                `(
                    oracao.frequencia = :frequenciaDiaria
                    OR (oracao.frequencia = :frequenciaSemanal AND oracao.dia_semana = :diaSemanaAtual)
                    OR (oracao.frequencia = :frequenciaMensal AND oracao.dia_mes = :diaMesAtual)
                )`,
                {
                    frequenciaDiaria: OracaoFrequencia.DIARIA,
                    frequenciaSemanal: OracaoFrequencia.SEMANAL,
                    frequenciaMensal: OracaoFrequencia.MENSAL,
                    diaSemanaAtual,
                    diaMesAtual,
                },
            )
            .andWhere(
                `NOT EXISTS (
                    SELECT 1
                    FROM sessao_oracoes so
                    INNER JOIN sessoes s ON s.id = so.sessao_id
                    WHERE so.oracao_id = oracao.id
                    AND s.user_id = :usuarioId
                    AND s.data_dia = :dataAtual
                    AND (s.finalizado = true OR so.feito_em IS NOT NULL)
                )`,
                { dataAtual },
            )
            .orderBy('oracao.criado_em', 'ASC')
            .getRawAndEntities();

        const totalItems = entities.length;

        return {
            data: entities.map((oracao) => OracaoViewModel.toDto(oracao)),
            page: 1,
            size: totalItems,
            totalItems,
            totalPages: totalItems > 0 ? 1 : 0,
        };
    }

    async iniciarSessaoViaTelegram(dto: TelegramIniciarSessaoRequestDto): Promise<{ data: SessaoDto[] }> {
        const integracao = await this.telegramIntegracaoRepository.findOne({
            where: { telegramUserId: dto.telegramUserId, linked: true },
        });

        if (!integracao) {
            throw new NotFoundException('Conta Telegram não vinculada a nenhum usuário.');
        }

        let oracaoIds = dto.oracao_ids;

        if (!oracaoIds || oracaoIds.length === 0) {
            const oracoesHoje = await this.listarOracoesHojeViaTelegram(dto.telegramUserId);
            oracaoIds = oracoesHoje.data.map((oracao) => oracao.id);
        }

        if (oracaoIds.length === 0) {
            throw new BadRequestException('Nenhuma oração disponível para a sessão de hoje.');
        }

        this.loggerService.log(`[IniciarSessaoViaTelegram]: Iniciando sessão para o usuário '${integracao.userId}'.`);

        return await this.sessoesService.iniciarSessao({ oracao_ids: oracaoIds }, integracao.userId);
    }

    async marcarOracaoFeitaNaSessaoViaTelegram(
        telegramUserId: string,
        sessaoId: number,
        oracaoId: number,
    ): Promise<{ data: { registrado_em: Date } }> {
        const integracao = await this.telegramIntegracaoRepository.findOne({
            where: { telegramUserId, linked: true },
        });

        if (!integracao) {
            throw new NotFoundException('Conta Telegram não vinculada a nenhum usuário.');
        }

        this.loggerService.log(`[MarcarOracaoFeitaNaSessaoViaTelegram]: Marcando oração '${oracaoId}' como feita na sessão '${sessaoId}' para o usuário '${integracao.userId}'.`);

        return await this.sessoesService.marcarOracaoFeitaNaSessao(sessaoId, oracaoId, integracao.userId);
    }

    private resolverDiaSemanaParao(frequencia: OracaoFrequencia, diaInformado?: number): number {
        if (diaInformado !== undefined) {
            return diaInformado;
        }
        return frequencia === OracaoFrequencia.SEMANAL ? new Date().getDay() : DIA_SEMANA_PADRAO;
    }

    private resolverDiaMesParao(frequencia: OracaoFrequencia, diaInformado?: number): number {
        if (diaInformado !== undefined) {
            return diaInformado;
        }
        return frequencia === OracaoFrequencia.MENSAL ? new Date().getDate() : DIA_MES_PADRAO;
    }
}
