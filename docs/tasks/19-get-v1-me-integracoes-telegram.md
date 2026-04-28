# Task 19 - GET /v1/me/integracoes/telegram

## Objetivo
Consultar status atual da integracao Telegram do usuario autenticado.

## Dependencias
- Task anterior necessaria: 18-post-v1-integracoes-telegram-link.md
- Bloqueios conhecidos: comportamento quando usuario nunca vinculou conta

## Escopo
### Inclui
- Leitura de status de vinculacao por usuario.
- Retorno de dados de conta vinculada.
- Serializacao em `TelegramStatusResponse`.

### Nao inclui
- Atualizacao de dados Telegram.
- Revogacao do vinculo.

## Cobertura do OpenAPI
### Endpoints
- GET /v1/me/integracoes/telegram

### Schemas e componentes
- components.schemas.TelegramStatusResponse
- components.securitySchemes.bearerAuth

## Passos de implementacao
1. Validar JWT do usuario.
2. Buscar estado da vinculacao Telegram.
3. Retornar payload conforme `TelegramStatusResponse`.

## Criterios de aceite
- [ ] Retorna 200 com status atual.
- [ ] Endpoint exige autenticacao bearer.
- [ ] Estrutura de resposta segue contrato.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de erro sem token.
- [ ] Teste de usuario sem vinculacao.

## Riscos e decisoes
- Risco: exposicao de identificadores sensiveis.
- Mitigacao: retornar apenas campos necessarios definidos no contrato.
- Decisao tecnica: manter consulta somente para contexto `me`.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
