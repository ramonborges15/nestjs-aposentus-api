# Task 18 - POST /v1/integracoes/telegram/link

## Objetivo
Consumir codigo temporario e vincular conta Telegram sem JWT, via autenticacao por codigo no body.

## Dependencias
- Task anterior necessaria: 17-post-v1-me-integracoes-telegram-codigo-link.md
- Bloqueios conhecidos: validacao de origem da requisicao externa

## Escopo
### Inclui
- Endpoint publico (`security: []`).
- Validacao de `TelegramLinkRequest`.
- Vinculacao da conta e retorno de `TelegramLinkResponse`.

### Nao inclui
- Revogacao de vinculo.
- Consulta de status da integracao.

## Cobertura do OpenAPI
### Endpoints
- POST /v1/integracoes/telegram/link

### Schemas e componentes
- components.schemas.TelegramLinkRequest
- components.schemas.TelegramLinkResponse

## Passos de implementacao
1. Validar payload e codigo temporario recebido.
2. Resolver usuario dono do codigo e salvar dados Telegram.
3. Invalidar codigo e retornar resultado de vinculacao.

## Criterios de aceite
- [ ] Retorna 200 com `linked=true` para codigo valido.
- [ ] Rejeita codigo expirado/invalido.
- [ ] Endpoint permanece sem JWT, conforme contrato.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de erro por codigo invalido.
- [ ] Teste de ausencia de bearer (deve continuar permitido).

## Riscos e decisoes
- Risco: endpoint publico sujeito a abuso.
- Mitigacao: rate limit + expiracao curta + auditoria.
- Decisao tecnica: single-use token para evitar replay.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
