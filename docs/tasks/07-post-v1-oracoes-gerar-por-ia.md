# Task 07 - POST /v1/oracoes/gerar-por-ia

## Objetivo
Iniciar processo de geracao de oracao por IA com base em textos biblicos, retornando mensagem de processamento.

## Dependencias
- Task anterior necessaria: 06-post-v1-oracoes.md
- Bloqueios conhecidos: provedor de IA e estrategia assincroma ainda nao detalhados

## Escopo
### Inclui
- Validacao de `OracaoGerarPorIARequest`.
- Disparo do processo de geracao (fila/job/worker).
- Retorno `MensagemProcessoIAResponse` com feedback imediato.

### Nao inclui
- Entrega sincrona do texto final gerado.
- Versionamento de historico de prompts.

## Cobertura do OpenAPI
### Endpoints
- POST /v1/oracoes/gerar-por-ia

### Schemas e componentes
- components.schemas.TextoBiblicoEntradaIA
- components.schemas.OracaoGerarPorIARequest
- components.schemas.MensagemProcessoIAResponse

## Passos de implementacao
1. Validar lista minima de textos biblicos e campos de recorrencia.
2. Publicar job de geracao com contexto do usuario.
3. Retornar mensagem de inicio de processamento.

## Criterios de aceite
- [ ] Retorna 200 imediatamente apos enfileirar o processo.
- [ ] Falha com erro de validacao para payload invalido.
- [ ] Nao processa requisicoes sem autenticacao.

## Testes minimos
- [ ] Teste de sucesso principal (job disparado).
- [ ] Teste de validacao de entrada.
- [ ] Teste de autorizacao.

## Riscos e decisoes
- Risco: timeout se execucao de IA for sincrona.
- Mitigacao: obrigar fluxo assincromo com fila.
- Decisao tecnica: resposta imediata com mensagem de processo.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
