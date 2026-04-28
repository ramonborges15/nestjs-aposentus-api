# Task 16 - PUT /v1/sessoes/{id}

## Objetivo
Finalizar sessao de oracao existente com query obrigatoria `evento=finalizar`.

## Dependencias
- Task anterior necessaria: 15-post-v1-sessoes.md
- Bloqueios conhecidos: comportamento quando sessao ja estiver finalizada

## Escopo
### Inclui
- Validacao de `id` e query `evento`.
- Atualizacao de estado para finalizado.
- Retorno de `SessaoSingleResponse`.

### Nao inclui
- Reabertura de sessao.
- Edicao de oracoes vinculadas na sessao.

## Cobertura do OpenAPI
### Endpoints
- PUT /v1/sessoes/{id}

### Schemas e componentes
- components.parameters.SessaoIdPath
- components.schemas.Sessao
- components.schemas.SessaoSingleResponse

## Passos de implementacao
1. Validar `id` e garantir `evento=finalizar`.
2. Carregar sessao do usuario e aplicar finalizacao.
3. Persistir e retornar `SessaoSingleResponse`.

## Criterios de aceite
- [ ] Finaliza sessao com retorno 200.
- [ ] Rejeita query sem `evento=finalizar`.
- [ ] Nao permite finalizar sessao de outro usuario.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao de query obrigatoria.
- [ ] Teste de autorizacao/ownership.

## Riscos e decisoes
- Risco: condicao de corrida em finalizacoes simultaneas.
- Mitigacao: lock otimista/pessimista no update de estado.
- Decisao tecnica: operacao idempotente para segunda chamada.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
