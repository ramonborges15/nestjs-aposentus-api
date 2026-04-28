# Task 11 - PUT /v1/base-biblica/{id}

## Objetivo
Editar texto biblico de apoio existente com `BaseBiblicaUpsertRequest`.

## Dependencias
- Task anterior necessaria: 10-get-v1-base-biblica-id.md
- Bloqueios conhecidos: politica de permissao para edicao (admin/usuario) nao especificada

## Escopo
### Inclui
- Validacao de `id` e payload.
- Atualizacao de referencia, tema e texto.
- Retorno de `BaseBiblicaSingleResponse`.

### Nao inclui
- Operacoes em lote.
- Versionamento de alteracoes.

## Cobertura do OpenAPI
### Endpoints
- PUT /v1/base-biblica/{id}

### Schemas e componentes
- components.parameters.BaseBiblicaIdPath
- components.schemas.BaseBiblicaUpsertRequest
- components.schemas.BaseBiblicaSingleResponse

## Passos de implementacao
1. Validar path/body conforme contrato.
2. Carregar registro e aplicar alteracoes.
3. Persistir e retornar recurso atualizado.

## Criterios de aceite
- [ ] Atualiza e retorna 200.
- [ ] Rejeita payload invalido.
- [ ] Respeita regra de permissao definida.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao/erro de entrada.
- [ ] Teste de autorizacao.

## Riscos e decisoes
- Risco: perda de qualidade sem validacao de tema/texto.
- Mitigacao: regras de tamanho e normalizacao.
- Decisao tecnica: reaproveitar schema de upsert para create e update.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
