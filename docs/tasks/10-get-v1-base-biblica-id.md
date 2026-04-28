# Task 10 - GET /v1/base-biblica/{id}

## Objetivo
Buscar um texto biblico de apoio por `id` e retornar `BaseBiblicaSingleResponse`.

## Dependencias
- Task anterior necessaria: 01-fundacao-auth-e-contratos.md
- Bloqueios conhecidos: regra de visibilidade (global vs por usuario) nao explicita

## Escopo
### Inclui
- Validacao de path param.
- Busca por identificador.
- Serializacao no schema de resposta unico.

### Nao inclui
- Atualizacao do texto biblico.
- Filtro por tema em lista.

## Cobertura do OpenAPI
### Endpoints
- GET /v1/base-biblica/{id}

### Schemas e componentes
- components.parameters.BaseBiblicaIdPath
- components.schemas.BaseBiblica
- components.schemas.BaseBiblicaSingleResponse

## Passos de implementacao
1. Validar `id` de entrada.
2. Consultar recurso por identificador.
3. Retornar `BaseBiblicaSingleResponse`.

## Criterios de aceite
- [ ] Retorna 200 para `id` existente.
- [ ] Retorna erro para `id` inexistente.
- [ ] Estrutura de resposta segue contrato.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao de `id`.
- [ ] Teste de autorizacao quando aplicavel.

## Riscos e decisoes
- Risco: ambiguidade de ownership do recurso.
- Mitigacao: decidir se recurso e global ou por usuario e aplicar consistentemente.
- Decisao tecnica: manter schema `tema` como array de strings.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
