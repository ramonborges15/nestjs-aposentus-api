# Task 15 - POST /v1/sessoes

## Objetivo
Inicializar nova sessao de oracao com base em `oracao_ids` e retornar dados da sessao.

## Dependencias
- Task anterior necessaria: 06-post-v1-oracoes.md
- Bloqueios conhecidos: contrato retorna `SessaoListResponse` em criacao (validar se esperado)

## Escopo
### Inclui
- Validacao de `SessaoCreateRequest`.
- Verificacao de ownership das oracoes informadas.
- Criacao da sessao e retorno no formato do contrato.

### Nao inclui
- Finalizacao de sessao.
- Estatisticas agregadas de desempenho.

## Cobertura do OpenAPI
### Endpoints
- POST /v1/sessoes

### Schemas e componentes
- components.schemas.SessaoCreateRequest
- components.schemas.Sessao
- components.schemas.SessaoListResponse

## Passos de implementacao
1. Validar array de `oracao_ids`.
2. Confirmar que todas as oracoes pertencem ao usuario.
3. Criar sessao e retornar payload conforme schema.

## Criterios de aceite
- [ ] Cria sessao valida e retorna 200.
- [ ] Rejeita ids invalidos ou de terceiros.
- [ ] Resposta respeita `SessaoListResponse`.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao/erro de entrada.
- [ ] Teste de autorizacao/ownership.

## Riscos e decisoes
- Risco: incoerencia entre create e schema de resposta em lista.
- Mitigacao: validar contrato com PO e ajustar antes da implementacao final.
- Decisao tecnica: manter aderencia estrita ao OpenAPI atual ate revisao.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
