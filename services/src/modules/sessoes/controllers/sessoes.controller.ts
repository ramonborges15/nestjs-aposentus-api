import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SessaoCreateRequestDto } from '../dtos/sessao-create-request.dto';
import { FinalizarSessaoQueryDto } from '../dtos/finalizar-sessao-query.dto';
import { SessoesService } from '../services/sessoes.service';

interface RequisicaoAutenticada extends Request {
    user: { sub: string; email: string; name: string };
}

@ApiTags('Sessões')
@ApiBearerAuth()
@Controller('v1/sessoes')
export class SessoesController {

    constructor(private readonly sessoesService: SessoesService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Iniciar uma nova sessão de oração' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Sessão criada com sucesso' })
    async iniciarSessao(
        @Body() dto: SessaoCreateRequestDto,
        @Req() req: RequisicaoAutenticada,
    ) {
        return await this.sessoesService.iniciarSessao(dto, req.user.sub);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Atualizar uma sessão (ex: finalizar)' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Sessão atualizada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Sessão não encontrada' })
    async atualizarSessao(
        @Param('id', ParseIntPipe) id: number,
        @Query() query: FinalizarSessaoQueryDto,
        @Req() req: RequisicaoAutenticada,
    ) {
        // query.evento é validado pelo FinalizarSessaoQueryDto via class-validator (@IsEnum)
        return await this.sessoesService.finalizarSessao(id, req.user.sub, query.evento);
    }
}
