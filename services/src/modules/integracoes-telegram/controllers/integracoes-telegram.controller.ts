import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SkipAuth } from 'shared/decorators/routes.decorator';
import { TelegramLinkRequestDto } from '../dtos/telegram-link-request.dto';
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
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Gerar código temporário para vinculação com Telegram' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Código de vinculação gerado com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_IMPLEMENTED, description: 'Funcionalidade não implementada' })
    async gerarCodigoLink(@Req() req: RequisicaoAutenticada) {
        return await this.integracoesTelegramService.gerarCodigoLink(req.user.sub);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Consultar status da integração com Telegram' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Status da integração retornado com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_IMPLEMENTED, description: 'Funcionalidade não implementada' })
    async consultarStatus(@Req() req: RequisicaoAutenticada) {
        return await this.integracoesTelegramService.consultarStatus(req.user.sub);
    }

    @Delete('link')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Revogar vinculação com Telegram' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Vinculação revogada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_IMPLEMENTED, description: 'Funcionalidade não implementada' })
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
    @ApiOperation({ summary: 'Vincular conta Telegram (público, sem autenticação JWT)' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Conta vinculada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_IMPLEMENTED, description: 'Funcionalidade não implementada' })
    async vincularConta(@Body() dto: TelegramLinkRequestDto) {
        return await this.integracoesTelegramService.vincularConta(dto);
    }
}
