# Task 05 - GET /v1/oracoes

## Objetivo
Listar oracoes do usuario autenticado com filtro por periodo e ordenacao, retornando `OracaoListResponse`.

## Dependencias
- Task anterior necessaria: 01-fundacao-auth-e-contratos.md
- Bloqueios conhecidos: semantica do filtro `periodo=dia` pode evoluir

## Escopo
### Inclui
- Validacao de query params `periodo` e `orderBy`.
- Consulta paginada/ordenada por usuario.
- Retorno com metadados `page`, `size`, `totalItems`, `totalPages`.

### Nao inclui
- Filtros avancados por tipo/tema.
- Geracao por IA.

## Cobertura do OpenAPI
### Endpoints
- GET /v1/oracoes

### Schemas e componentes
- components.schemas.Oracao
- components.schemas.OracaoListResponse

## Passos de implementacao
1. Validar query params permitidos pelo contrato.
2. Executar consulta com filtro por usuario e ordenacao.
3. Serializar lista paginada em `OracaoListResponse`.

## Criterios de aceite
- [ ] Retorna 200 com lista paginada.
- [ ] Rejeita `orderBy` fora de `ASC|DESC`.
- [ ] Nao retorna registros de outros usuarios.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao de query.
- [ ] Teste de autorizacao/isolamento por usuario.

## Riscos e decisoes
- Risco: performance em listas grandes.
- Mitigacao: indices por `user_id` e campos de ordenacao.
- Decisao tecnica: padrao de paginacao unico para recursos listaveis.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
