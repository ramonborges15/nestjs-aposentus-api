# Task 08 - POST /v1/oracoes/{id}/gerar-por-ia

## Objetivo
Gerar nova versao por IA para uma oracao existente, com escopo no recurso do usuario autenticado.

## Dependencias
- Task anterior necessaria: 07-post-v1-oracoes-gerar-por-ia.md
- Bloqueios conhecidos: estrategia de versionamento de conteudo nao definida

## Escopo
### Inclui
- Validacao de `id` e body `OracaoGerarPorIARequest`.
- Verificacao de ownership da oracao base.
- Disparo do processo de geracao e resposta imediata.

### Nao inclui
- Publicacao automatica sem confirmacao do usuario.
- Merge entre versoes antigas e novas.

## Cobertura do OpenAPI
### Endpoints
- POST /v1/oracoes/{id}/gerar-por-ia

### Schemas e componentes
- components.parameters.OracaoIdPath
- components.schemas.OracaoGerarPorIARequest
- components.schemas.MensagemProcessoIAResponse

## Passos de implementacao
1. Validar `id` e payload de geracao.
2. Garantir que a oracao alvo pertence ao usuario.
3. Enfileirar geracao de nova versao e retornar mensagem.

## Criterios de aceite
- [ ] Retorna 200 para recurso valido do usuario.
- [ ] Rejeita `id` inexistente/nao autorizado.
- [ ] Rejeita payload invalido.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao/erro de entrada.
- [ ] Teste de autorizacao/ownership.

## Riscos e decisoes
- Risco: sobrescrita indevida de conteudo existente.
- Mitigacao: persistir resultado como nova versao ou rascunho.
- Decisao tecnica: nao atualizar recurso final no mesmo request.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
