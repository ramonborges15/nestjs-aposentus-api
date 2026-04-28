# Task 03 - PUT /v1/oracoes/{id}

## Objetivo
Permitir editar uma oracao existente com payload `OracaoUpsertRequest` e retornar o recurso atualizado.

## Dependencias
- Task anterior necessaria: 02-get-v1-oracoes-id.md
- Bloqueios conhecidos: validacoes condicionais entre `frequencia`, `dia_semana` e `dia_mes`

## Escopo
### Inclui
- Validacao de body de atualizacao.
- Verificacao de ownership do recurso.
- Persistencia de alteracoes e retorno atualizado.

### Nao inclui
- Criacao de novas oracoes.
- Gatilhos de IA.

## Cobertura do OpenAPI
### Endpoints
- PUT /v1/oracoes/{id}

### Schemas e componentes
- components.parameters.OracaoIdPath
- components.schemas.OracaoUpsertRequest
- components.schemas.OracaoSingleResponse

## Passos de implementacao
1. Validar `id` e body conforme `OracaoUpsertRequest`.
2. Carregar oracao do usuario e aplicar alteracoes.
3. Salvar e retornar `OracaoSingleResponse`.

## Criterios de aceite
- [ ] Atualiza recurso existente e retorna 200.
- [ ] Rejeita payload invalido com erro de validacao.
- [ ] Impede atualizacao de oracao de outro usuario.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao/erro de entrada.
- [ ] Teste de autorizacao/ownership.

## Riscos e decisoes
- Risco: inconsistencias de recorrencia por campos conflitantes.
- Mitigacao: criar validacoes semanticas por tipo de frequencia.
- Decisao tecnica: manter mesmo schema de entrada de create e update.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
