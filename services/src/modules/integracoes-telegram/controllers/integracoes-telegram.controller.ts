import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SkipAuth } from 'shared/decorators/routes.decorator';
import { TelegramLinkRequestDto } from '../dtos/telegram-link-request.dto';
import { TelegramOracaoRequestDto } from '../dtos/telegram-oracao-request.dto';
import { IntegracoesTelegramService } from '../services/integracoes-telegram.service';

interface RequisicaoAutenticada extends Request {
    user: { sub: string; email: string; name: string };
}

@ApiTags('Integrações Telegram')
@ApiBearerAuth()
@Controller('v1/me/integracoes/telegram')
export class MeIntegracoesTelegramController {

    constructor(private readonly integracoesTelegramService: IntegracoesTelegramService) { }

    @Post('codigo-link')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Gerar código temporário para vinculação com Telegram' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Código de vinculação gerado com sucesso' })
    async gerarCodigoLink(@Req() req: RequisicaoAutenticada) {
        return await this.integracoesTelegramService.gerarCodigoLink(req.user.sub);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Consultar status da integração com Telegram' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Status da integração retornado com sucesso' })
    async consultarStatus(@Req() req: RequisicaoAutenticada) {
        return await this.integracoesTelegramService.consultarStatus(req.user.sub);
    }

    @Delete('link')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Revogar vinculação com Telegram' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Vinculação revogada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Integração não encontrada' })
    async revogarVinculo(@Req() req: RequisicaoAutenticada) {
        return await this.integracoesTelegramService.revogarVinculo(req.user.sub);
    }
}

@ApiTags('Integrações Telegram')
@Controller('v1/integracoes/telegram')
export class IntegracoesTelegramPublicoController {

    constructor(private readonly integracoesTelegramService: IntegracoesTelegramService) { }

    @SkipAuth()
    @Post('link')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Vincular conta Telegram (chamado pelo bot, sem autenticação JWT)' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Conta vinculada com sucesso' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Código inválido ou expirado' })
    async vincularConta(@Body() dto: TelegramLinkRequestDto) {
        return await this.integracoesTelegramService.vincularConta(dto);
    }

    @SkipAuth()
    @Post('bot/oracoes')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Adicionar oração via bot do Telegram (chamado pelo bot, sem autenticação JWT)' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Oração adicionada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Conta Telegram não vinculada' })
    async adicionarOracaoViaTelegram(@Body() dto: TelegramOracaoRequestDto) {
        return await this.integracoesTelegramService.adicionarOracaoViaTelegram(dto);
    }

    @SkipAuth()
    @Get('bot/oracoes/hoje')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar orações do dia via bot do Telegram (chamado pelo bot, sem autenticação JWT)' })
    @ApiQuery({ name: 'telegramUserId', description: 'ID do usuário no Telegram', required: true })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de orações do dia retornada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Conta Telegram não vinculada' })
    async listarOracoesHojeViaTelegram(@Query('telegramUserId') telegramUserId: string) {
        return await this.integracoesTelegramService.listarOracoesHojeViaTelegram(telegramUserId);
    }
}
