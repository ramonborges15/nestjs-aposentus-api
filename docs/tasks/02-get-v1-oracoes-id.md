# Task 02 - GET /v1/oracoes/{id}

## Objetivo
Permitir buscar uma oracao por identificador retornando `OracaoSingleResponse` para o usuario autenticado.

## Dependencias
- Task anterior necessaria: 01-fundacao-auth-e-contratos.md
- Bloqueios conhecidos: regra de ownership por `user_id`

## Escopo
### Inclui
- Busca por `id` com validacao de parametro.
- Verificacao de ownership da oracao.
- Serializacao no formato `data`.

### Nao inclui
- Atualizacao ou exclusao da oracao.
- Ordenacao e paginacao de lista.

## Cobertura do OpenAPI
### Endpoints
- GET /v1/oracoes/{id}

### Schemas e componentes
- components.parameters.OracaoIdPath
- components.schemas.Oracao
- components.schemas.OracaoSingleResponse

## Passos de implementacao
1. Criar handler GET com validacao de `id`.
2. Buscar oracao por `id` e `user_id`.
3. Retornar payload no formato `OracaoSingleResponse`.

## Criterios de aceite
- [ ] Retorna 200 com oracao existente do usuario.
- [ ] Retorna erro quando `id` nao existe ou nao pertence ao usuario.
- [ ] Resposta segue envelope `data`.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de `id` invalido (erro de validacao).
- [ ] Teste de autorizacao/ownership.

## Riscos e decisoes
- Risco: vazamento de dados entre usuarios.
- Mitigacao: sempre filtrar por `id + user_id`.
- Decisao tecnica: padronizar retorno de recurso unico em `OracaoSingleResponse`.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
