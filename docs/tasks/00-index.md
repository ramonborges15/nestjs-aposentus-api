# 00 - Index das Tasks OpenAPI

## Resumo
- Fonte OpenAPI: docs/openapi/openapi.yaml
- Total de tasks: 20
- Cobertura de endpoints: 19/19
- Schemas/componentes cobertos: 20/20 criticos

## Ordem de execucao
| Ordem | Arquivo | Objetivo | Dependencias |
|---|---|---|---|
| 01 | 01-fundacao-auth-e-contratos.md | Fundacao de auth, validacao e contrato comum | nenhuma |
| 02 | 02-get-v1-oracoes-id.md | Buscar oracao por id | 01 |
| 03 | 03-put-v1-oracoes-id.md | Editar oracao existente | 02 |
| 04 | 04-delete-v1-oracoes-id.md | Excluir oracao existente | 02 |
| 05 | 05-get-v1-oracoes.md | Listar oracoes | 01 |
| 06 | 06-post-v1-oracoes.md | Criar oracao | 01 |
| 07 | 07-post-v1-oracoes-gerar-por-ia.md | Iniciar geracao de oracao por IA | 06 |
| 08 | 08-post-v1-oracoes-id-gerar-por-ia.md | Gerar nova versao por IA para oracao | 07 |
| 09 | 09-put-v1-oracoes-id-registro-evento.md | Registrar evento de oracao | 02 |
| 10 | 10-get-v1-base-biblica-id.md | Buscar texto biblico por id | 01 |
| 11 | 11-put-v1-base-biblica-id.md | Editar texto biblico | 10 |
| 12 | 12-delete-v1-base-biblica-id.md | Excluir texto biblico | 10 |
| 13 | 13-get-v1-base-biblica.md | Listar textos biblicos | 01 |
| 14 | 14-post-v1-base-biblica.md | Criar texto biblico | 01 |
| 15 | 15-post-v1-sessoes.md | Inicializar sessao de oracao | 06 |
| 16 | 16-put-v1-sessoes-id.md | Finalizar sessao de oracao | 15 |
| 17 | 17-post-v1-me-integracoes-telegram-codigo-link.md | Gerar codigo de vinculacao Telegram | 01 |
| 18 | 18-post-v1-integracoes-telegram-link.md | Consumir codigo e vincular Telegram | 17 |
| 19 | 19-get-v1-me-integracoes-telegram.md | Consultar status da integracao Telegram | 18 |
| 20 | 20-delete-v1-me-integracoes-telegram-link.md | Revogar vinculacao Telegram | 19 |

## Matriz de rastreabilidade
| Endpoint/Componente | Task responsavel |
|---|---|
| GET /v1/oracoes/{id} | 02-get-v1-oracoes-id.md |
| PUT /v1/oracoes/{id} | 03-put-v1-oracoes-id.md |
| DELETE /v1/oracoes/{id} | 04-delete-v1-oracoes-id.md |
| GET /v1/oracoes | 05-get-v1-oracoes.md |
| POST /v1/oracoes | 06-post-v1-oracoes.md |
| POST /v1/oracoes/gerar-por-ia | 07-post-v1-oracoes-gerar-por-ia.md |
| POST /v1/oracoes/{id}/gerar-por-ia | 08-post-v1-oracoes-id-gerar-por-ia.md |
| PUT /v1/oracoes/{id}/registro-evento | 09-put-v1-oracoes-id-registro-evento.md |
| GET /v1/base-biblica/{id} | 10-get-v1-base-biblica-id.md |
| PUT /v1/base-biblica/{id} | 11-put-v1-base-biblica-id.md |
| DELETE /v1/base-biblica/{id} | 12-delete-v1-base-biblica-id.md |
| GET /v1/base-biblica | 13-get-v1-base-biblica.md |
| POST /v1/base-biblica | 14-post-v1-base-biblica.md |
| POST /v1/sessoes | 15-post-v1-sessoes.md |
| PUT /v1/sessoes/{id} | 16-put-v1-sessoes-id.md |
| POST /v1/me/integracoes/telegram/codigo-link | 17-post-v1-me-integracoes-telegram-codigo-link.md |
| POST /v1/integracoes/telegram/link | 18-post-v1-integracoes-telegram-link.md |
| GET /v1/me/integracoes/telegram | 19-get-v1-me-integracoes-telegram.md |
| DELETE /v1/me/integracoes/telegram/link | 20-delete-v1-me-integracoes-telegram-link.md |
| components.securitySchemes.bearerAuth | 01-fundacao-auth-e-contratos.md |
| components.parameters.OracaoIdPath | 01-fundacao-auth-e-contratos.md |
| components.parameters.BaseBiblicaIdPath | 01-fundacao-auth-e-contratos.md |
| components.parameters.SessaoIdPath | 01-fundacao-auth-e-contratos.md |
| components.schemas.Oracao | 02-get-v1-oracoes-id.md |
| components.schemas.OracaoUpsertRequest | 03-put-v1-oracoes-id.md |
| components.schemas.TextoBiblicoEntradaIA | 07-post-v1-oracoes-gerar-por-ia.md |
| components.schemas.OracaoGerarPorIARequest | 07-post-v1-oracoes-gerar-por-ia.md |
| components.schemas.OracaoSingleResponse | 02-get-v1-oracoes-id.md |
| components.schemas.OracaoListResponse | 05-get-v1-oracoes.md |
| components.schemas.MensagemProcessoIAResponse | 07-post-v1-oracoes-gerar-por-ia.md |
| components.schemas.RegistroEventoResponse | 09-put-v1-oracoes-id-registro-evento.md |
| components.schemas.BaseBiblica | 10-get-v1-base-biblica-id.md |
| components.schemas.BaseBiblicaUpsertRequest | 11-put-v1-base-biblica-id.md |
| components.schemas.BaseBiblicaSingleResponse | 10-get-v1-base-biblica-id.md |
| components.schemas.BaseBiblicaListResponse | 13-get-v1-base-biblica.md |
| components.schemas.Sessao | 15-post-v1-sessoes.md |
| components.schemas.SessaoCreateRequest | 15-post-v1-sessoes.md |
| components.schemas.SessaoSingleResponse | 16-put-v1-sessoes-id.md |
| components.schemas.SessaoListResponse | 15-post-v1-sessoes.md |
| components.schemas.TelegramCodigoLinkResponse | 17-post-v1-me-integracoes-telegram-codigo-link.md |
| components.schemas.TelegramLinkRequest | 18-post-v1-integracoes-telegram-link.md |
| components.schemas.TelegramLinkResponse | 18-post-v1-integracoes-telegram-link.md |
| components.schemas.TelegramStatusResponse | 19-get-v1-me-integracoes-telegram.md |
| components.schemas.TelegramRevokeResponse | 20-delete-v1-me-integracoes-telegram-link.md |

## Ambiguidades a validar
- Contrato define apenas respostas 200, sem modelos de erro; confirmar padrao de erros esperado.
- Em `OracaoUpsertRequest`, `dia_semana` e `dia_mes` estao ambos obrigatorios para todas as frequencias.
- `POST /v1/sessoes` retorna `SessaoListResponse`; validar se deveria ser `SessaoSingleResponse`.
- `GET /v1/oracoes` possui `periodo` com unico valor `dia`; confirmar roadmap de novos periodos.
- Regras de ownership em `Base Biblica` (global x por usuario) nao estao explicitas.

## Observacoes para handoff ao agente
- Execute as tasks em ordem numerica.
- Nao avance para a proxima com pendencias nos criterios de aceite.
- Em caso de conflito de contrato, pausar e abrir task de clarificacao.
