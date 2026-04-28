import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/modules/logger/logger.service';
import { Repository } from 'typeorm';
import { BaseBiblicaListaQueryDto } from '../dtos/base-biblica-lista-query.dto';
import { BaseBiblicaUpsertRequestDto } from '../dtos/base-biblica-upsert-request.dto';
import { BaseBiblica } from '../entities/base-biblica.entity';
import { BaseBiblicaDto, BaseBiblicaViewModel } from '../view-models/base-biblica.view-model';

@Injectable()
export class BaseBiblicaService {

    constructor(
        private readonly loggerService: LoggerService,
        @InjectRepository(BaseBiblica)
        private readonly baseBiblicaRepository: Repository<BaseBiblica>,
    ) { }

    async buscarPorId(id: number): Promise<{ data: BaseBiblicaDto }> {
        const registro = await this.baseBiblicaRepository.findOne({ where: { id } });

        if (!registro) {
            this.loggerService.error(`[BuscarPorId]: Registro de id '${id}' não encontrado na base bíblica`);
            throw new NotFoundException('Registro bíblico não encontrado.');
        }

        return { data: BaseBiblicaViewModel.toDto(registro) };
    }

    async editar(id: number, dto: BaseBiblicaUpsertRequestDto): Promise<{ data: BaseBiblicaDto }> {
        const registro = await this.baseBiblicaRepository.findOne({ where: { id } });

        if (!registro) {
            this.loggerService.error(`[Editar]: Registro de id '${id}' não encontrado na base bíblica`);
            throw new NotFoundException('Registro bíblico não encontrado.');
        }

        this.aplicarDtoNoRegistro(registro, dto);

        const registroAtualizado = await this.baseBiblicaRepository.save(registro);
        this.loggerService.log(`[Editar]: Registro de id '${id}' atualizado com sucesso.`);

        return { data: BaseBiblicaViewModel.toDto(registroAtualizado) };
    }

    async excluir(id: number): Promise<void> {
        const registro = await this.baseBiblicaRepository.findOne({ where: { id } });

        if (!registro) {
            this.loggerService.error(`[Excluir]: Registro de id '${id}' não encontrado na base bíblica`);
            throw new NotFoundException('Registro bíblico não encontrado.');
        }

        await this.baseBiblicaRepository.delete(id);
        this.loggerService.log(`[Excluir]: Registro de id '${id}' excluído com sucesso.`);
    }

    async listar(query: BaseBiblicaListaQueryDto): Promise<{ data: BaseBiblicaDto[]; page: number; size: number; totalItems: number; totalPages: number }> {
        const pagina = query.page ?? 1;
        const tamanho = query.size ?? 10;

        const queryBuilder = this.baseBiblicaRepository.createQueryBuilder('base_biblica');

        if (query.tema) {
            queryBuilder.where('base_biblica.tema @> ARRAY[:tema]', { tema: query.tema });
        }

        queryBuilder.skip((pagina - 1) * tamanho).take(tamanho);

        const [registros, totalItens] = await queryBuilder.getManyAndCount();

        return {
            data: registros.map(BaseBiblicaViewModel.toDto),
            page: pagina,
            size: tamanho,
            totalItems: totalItens,
            totalPages: Math.ceil(totalItens / tamanho),
        };
    }

    async criar(dto: BaseBiblicaUpsertRequestDto): Promise<{ data: BaseBiblicaDto }> {
        const novoRegistro = this.baseBiblicaRepository.create();

        this.aplicarDtoNoRegistro(novoRegistro, dto);

        const registroCriado = await this.baseBiblicaRepository.save(novoRegistro);
        this.loggerService.log(`[Criar]: Registro bíblico criado com sucesso.`);

        return { data: BaseBiblicaViewModel.toDto(registroCriado) };
    }

    private aplicarDtoNoRegistro(registro: BaseBiblica, dto: BaseBiblicaUpsertRequestDto): void {
        registro.referencia = dto.referencia ?? null;
        registro.tema = dto.tema;
        registro.texto = dto.texto;
    }
}
