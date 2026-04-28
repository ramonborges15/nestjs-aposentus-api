# Task 20 - DELETE /v1/me/integracoes/telegram/link

## Objetivo
Desvincular ou revogar acesso do Telegram para o usuario autenticado.

## Dependencias
- Task anterior necessaria: 19-get-v1-me-integracoes-telegram.md
- Bloqueios conhecidos: impacto em sessoes ativas do bot

## Escopo
### Inclui
- Revogacao do vinculo Telegram.
- Inutilizacao de tokens/chaves relacionadas.
- Retorno de `TelegramRevokeResponse`.

### Nao inclui
- Re-vinculacao automatica.
- Historico de auditoria detalhado.

## Cobertura do OpenAPI
### Endpoints
- DELETE /v1/me/integracoes/telegram/link

### Schemas e componentes
- components.schemas.TelegramRevokeResponse
- components.securitySchemes.bearerAuth

## Passos de implementacao
1. Validar contexto autenticado do usuario.
2. Revogar dados de vinculacao Telegram.
3. Retornar `revoked` em `TelegramRevokeResponse`.

## Criterios de aceite
- [ ] Retorna 200 com `revoked=true` quando aplicavel.
- [ ] Endpoint exige JWT bearer.
- [ ] Operacao e idempotente para chamadas repetidas.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de erro sem token.
- [ ] Teste de idempotencia.

## Riscos e decisoes
- Risco: revogacao parcial deixa acesso residual.
- Mitigacao: apagar vinculacao e invalidar credenciais relacionadas na mesma transacao.
- Decisao tecnica: priorizar seguranca sobre preservacao de metadados.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
