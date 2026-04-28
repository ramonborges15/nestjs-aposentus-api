# Task 09 - PUT /v1/oracoes/{id}/registro-evento

## Objetivo
Registrar evento de oracao realizada para um recurso do usuario, atualizando metrica/ultima ocorrencia.

## Dependencias
- Task anterior necessaria: 02-get-v1-oracoes-id.md
- Bloqueios conhecidos: regra de idempotencia por dia nao especificada

## Escopo
### Inclui
- Validacao de `id`.
- Verificacao de ownership.
- Registro de timestamp `registrado_em` no retorno.

### Nao inclui
- Historico detalhado de auditoria completo.
- Recalculo de analises avancadas.

## Cobertura do OpenAPI
### Endpoints
- PUT /v1/oracoes/{id}/registro-evento

### Schemas e componentes
- components.parameters.OracaoIdPath
- components.schemas.RegistroEventoResponse

## Passos de implementacao
1. Validar identificador e autoria do recurso.
2. Registrar evento de realizacao com timestamp do servidor.
3. Retornar `RegistroEventoResponse`.

## Criterios de aceite
- [ ] Retorna 200 com `registrado_em`.
- [ ] Nao permite registrar em recurso de outro usuario.
- [ ] Operacao trata repeticao conforme regra definida.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de `id` invalido.
- [ ] Teste de autorizacao/ownership.

## Riscos e decisoes
- Risco: dupla contagem de eventos em chamadas repetidas.
- Mitigacao: definir idempotencia por janela temporal.
- Decisao tecnica: usar horario do servidor para consistencia.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
