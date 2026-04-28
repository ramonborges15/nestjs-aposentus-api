import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { OracaoGerarPorIARequestDto } from '../dtos/oracao-gerar-por-ia-request.dto';
import { OracaoListaQueryDto } from '../dtos/oracao-lista-query.dto';
import { OracaoUpsertRequestDto } from '../dtos/oracao-upsert-request.dto';
import { OracoesService } from '../services/oracoes.service';
import { OracaoListaResponseDto } from '../view-models/oracao.view-model';

interface RequisicaoAutenticada extends Request {
    user: { sub: string; email: string; name: string };
}

@ApiTags('Orações')
@ApiBearerAuth()
@Controller('v1/oracoes')
export class OracoesController {

    constructor(private readonly oracoesService: OracoesService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar orações do usuário' })
    @ApiOkResponse({ type: OracaoListaResponseDto, description: 'Lista de orações retornada com sucesso' })
    async listar(@Query() query: OracaoListaQueryDto, @Req() req: RequisicaoAutenticada) {
        return await this.oracoesService.listar(query, req.user.sub);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Criar uma nova oração' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Oração criada com sucesso' })
    async criar(@Body() dto: OracaoUpsertRequestDto, @Req() req: RequisicaoAutenticada) {
        return await this.oracoesService.criar(dto, req.user.sub);
    }

    @Post('gerar-por-ia')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Gerar oração por IA' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Processo de geração por IA iniciado' })
    async gerarPorIa(@Body() dto: OracaoGerarPorIARequestDto, @Req() req: RequisicaoAutenticada) {
        return await this.oracoesService.gerarPorIa(dto, req.user.sub);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar uma oração por ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Oração encontrada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oração não encontrada' })
    async buscarPorId(@Param('id', ParseIntPipe) id: number, @Req() req: RequisicaoAutenticada) {
        return await this.oracoesService.buscarPorId(id, req.user.sub);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Editar uma oração' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Oração atualizada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oração não encontrada' })
    async editar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: OracaoUpsertRequestDto,
        @Req() req: RequisicaoAutenticada,
    ) {
        return await this.oracoesService.editar(id, req.user.sub, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Excluir uma oração' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Oração excluída com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oração não encontrada' })
    async excluir(@Param('id', ParseIntPipe) id: number, @Req() req: RequisicaoAutenticada) {
        await this.oracoesService.excluir(id, req.user.sub);
    }

    @Post(':id/gerar-por-ia')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Gerar nova versão de oração por IA' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Processo de geração por IA iniciado' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oração não encontrada' })
    async gerarNovaVersaoPorIa(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: OracaoGerarPorIARequestDto,
        @Req() req: RequisicaoAutenticada,
    ) {
        return await this.oracoesService.gerarNovaVersaoPorIa(id, dto, req.user.sub);
    }

    @Put(':id/registro-evento')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Registrar evento de uma oração' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Evento registrado com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Oração não encontrada' })
    async registrarEvento(@Param('id', ParseIntPipe) id: number, @Req() req: RequisicaoAutenticada) {
        return await this.oracoesService.registrarEvento(id, req.user.sub);
    }
}
