# Task 17 - POST /v1/me/integracoes/telegram/codigo-link

## Objetivo
Gerar codigo temporario e unico para vinculacao de conta Telegram do usuario autenticado.

## Dependencias
- Task anterior necessaria: 01-fundacao-auth-e-contratos.md
- Bloqueios conhecidos: politica de expiracao e limite de tentativas

## Escopo
### Inclui
- Geracao de codigo unico com validade (`expiresAt`).
- Montagem de `deepLinkUrl` para fluxo de vinculacao.
- Retorno de `TelegramCodigoLinkResponse`.

### Nao inclui
- Consumo do codigo para efetivar link.
- Integracao de webhook com Telegram.

## Cobertura do OpenAPI
### Endpoints
- POST /v1/me/integracoes/telegram/codigo-link

### Schemas e componentes
- components.schemas.TelegramCodigoLinkResponse
- components.securitySchemes.bearerAuth

## Passos de implementacao
1. Validar autenticacao do usuario.
2. Gerar codigo de uso unico com TTL.
3. Retornar codigo, expiração e deep link.

## Criterios de aceite
- [ ] Retorna 200 com `code`, `expiresAt` e `deepLinkUrl`.
- [ ] Codigo gerado e unico para a janela ativa.
- [ ] Endpoint exige JWT valido.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de erro sem token.
- [ ] Teste de unicidade/expiracao do codigo.

## Riscos e decisoes
- Risco: reutilizacao indevida de codigo.
- Mitigacao: invalidar codigo apos primeiro uso.
- Decisao tecnica: TTL curto com renovacao explicita.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
