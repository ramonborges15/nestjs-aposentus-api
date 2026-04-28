# Task 13 - GET /v1/base-biblica

## Objetivo
Listar textos biblicos por filtros e paginacao retornando `BaseBiblicaListResponse`.

## Dependencias
- Task anterior necessaria: 01-fundacao-auth-e-contratos.md
- Bloqueios conhecidos: semantica de filtro `tema` em array precisa de padrao (contains/exact)

## Escopo
### Inclui
- Validacao de query (`tema`, `page`, `size`).
- Consulta paginada com filtro por tema.
- Retorno com metadados de pagina.

### Nao inclui
- Busca full-text com relevancia.
- Ordenacoes avancadas nao previstas no contrato.

## Cobertura do OpenAPI
### Endpoints
- GET /v1/base-biblica

### Schemas e componentes
- components.schemas.BaseBiblica
- components.schemas.BaseBiblicaListResponse

## Passos de implementacao
1. Validar parametros de consulta.
2. Implementar filtro por tema e paginacao.
3. Serializar retorno em `BaseBiblicaListResponse`.

## Criterios de aceite
- [ ] Retorna lista paginada com 200.
- [ ] Rejeita `page/size` invalidos.
- [ ] Aplica filtro `tema` conforme regra definida.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao de query.
- [ ] Teste de autorizacao (quando aplicavel).

## Riscos e decisoes
- Risco: consulta lenta em filtro por tags.
- Mitigacao: indice adequado para campo de tema.
- Decisao tecnica: normalizar temas para busca consistente.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
