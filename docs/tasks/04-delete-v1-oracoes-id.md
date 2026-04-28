# Task 04 - DELETE /v1/oracoes/{id}

## Objetivo
Permitir remover (hard delete ou soft delete, conforme decisao tecnica) uma oracao do usuario autenticado.

## Dependencias
- Task anterior necessaria: 02-get-v1-oracoes-id.md
- Bloqueios conhecidos: estrategia de soft delete ainda nao explicitada no contrato

## Escopo
### Inclui
- Validacao de `id`.
- Verificacao de ownership.
- Exclusao idempotente com retorno 200.

### Nao inclui
- Cascatas complexas de sessoes historicas.
- Auditoria detalhada de exclusao.

## Cobertura do OpenAPI
### Endpoints
- DELETE /v1/oracoes/{id}

### Schemas e componentes
- components.parameters.OracaoIdPath

## Passos de implementacao
1. Validar parametro de path.
2. Confirmar posse do recurso pelo usuario autenticado.
3. Executar exclusao e retornar sucesso.

## Criterios de aceite
- [ ] Endpoint remove recurso existente do usuario.
- [ ] Operacao nao remove dados de outro usuario.
- [ ] Resposta 200 conforme contrato.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de `id` invalido.
- [ ] Teste de autorizacao/ownership.

## Riscos e decisoes
- Risco: perda irreversivel de dados importantes.
- Mitigacao: decidir e documentar soft delete se necessario.
- Decisao tecnica: manter comportamento idempotente para repeticoes.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
