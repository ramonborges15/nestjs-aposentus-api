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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseBiblicaListaQueryDto } from '../dtos/base-biblica-lista-query.dto';
import { BaseBiblicaUpsertRequestDto } from '../dtos/base-biblica-upsert-request.dto';
import { BaseBiblicaService } from '../services/base-biblica.service';

@ApiTags('Base Bíblica')
@ApiBearerAuth()
@Controller('v1/base-biblica')
export class BaseBiblicaController {

    constructor(private readonly baseBiblicaService: BaseBiblicaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Listar registros da base bíblica' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de registros retornada com sucesso' })
    async listar(@Query() query: BaseBiblicaListaQueryDto) {
        return await this.baseBiblicaService.listar(query);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Criar um novo registro bíblico' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Registro bíblico criado com sucesso' })
    async criar(@Body() dto: BaseBiblicaUpsertRequestDto) {
        return await this.baseBiblicaService.criar(dto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Buscar um registro bíblico por ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Registro bíblico encontrado com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Registro bíblico não encontrado' })
    async buscarPorId(@Param('id', ParseIntPipe) id: number) {
        return await this.baseBiblicaService.buscarPorId(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Editar um registro bíblico' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Registro bíblico atualizado com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Registro bíblico não encontrado' })
    async editar(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: BaseBiblicaUpsertRequestDto,
    ) {
        return await this.baseBiblicaService.editar(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Excluir um registro bíblico' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Registro bíblico excluído com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Registro bíblico não encontrado' })
    async excluir(@Param('id', ParseIntPipe) id: number) {
        await this.baseBiblicaService.excluir(id);
    }
}
