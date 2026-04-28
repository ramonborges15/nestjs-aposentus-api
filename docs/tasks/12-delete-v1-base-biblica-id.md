# Task 12 - DELETE /v1/base-biblica/{id}

## Objetivo
Remover um texto biblico de apoio existente por `id`.

## Dependencias
- Task anterior necessaria: 10-get-v1-base-biblica-id.md
- Bloqueios conhecidos: impacto em referencias cruzadas ainda nao mapeado

## Escopo
### Inclui
- Validacao de path param.
- Exclusao segura do recurso.
- Resposta 200 conforme contrato.

### Nao inclui
- Limpeza retroativa de historico de IA.
- Reprocessamento de dependencias externas.

## Cobertura do OpenAPI
### Endpoints
- DELETE /v1/base-biblica/{id}

### Schemas e componentes
- components.parameters.BaseBiblicaIdPath

## Passos de implementacao
1. Validar `id`.
2. Executar exclusao com politica definida (hard/soft).
3. Retornar confirmacao de sucesso.

## Criterios de aceite
- [ ] Endpoint retorna 200 para exclusao valida.
- [ ] Nao quebra integridade referencial definida.
- [ ] Mantem padrao de erros para recurso inexistente.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de `id` invalido.
- [ ] Teste de autorizacao (quando aplicavel).

## Riscos e decisoes
- Risco: orfandade de dados dependentes.
- Mitigacao: mapear e proteger relacoes antes da remocao.
- Decisao tecnica: comportamento idempotente em chamadas repetidas.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
