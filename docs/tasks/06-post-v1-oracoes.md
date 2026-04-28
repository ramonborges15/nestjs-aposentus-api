# Task 06 - POST /v1/oracoes

## Objetivo
Criar uma nova oracao para o usuario autenticado a partir de `OracaoUpsertRequest`.

## Dependencias
- Task anterior necessaria: 01-fundacao-auth-e-contratos.md
- Bloqueios conhecidos: regra de limite por usuario nao definida no contrato

## Escopo
### Inclui
- Validacao de body.
- Persistencia da oracao com associacao ao usuario.
- Retorno do recurso criado em `OracaoSingleResponse`.

### Nao inclui
- Geracao assistida por IA.
- Registro de eventos de realizacao.

## Cobertura do OpenAPI
### Endpoints
- POST /v1/oracoes

### Schemas e componentes
- components.schemas.OracaoUpsertRequest
- components.schemas.Oracao
- components.schemas.OracaoSingleResponse

## Passos de implementacao
1. Validar payload de entrada.
2. Criar entidade de oracao vinculada ao usuario autenticado.
3. Retornar recurso criado no formato de resposta unico.

## Criterios de aceite
- [ ] Retorna 200 com recurso criado.
- [ ] Rejeita payload incompleto/invalido.
- [ ] Salva `user_id` de forma consistente.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao/erro de entrada.
- [ ] Teste de autorizacao (JWT obrigatorio).

## Riscos e decisoes
- Risco: validacao insuficiente para campos de recorrencia.
- Mitigacao: regras semanticas centralizadas no dominio.
- Decisao tecnica: reaproveitar schema de upsert para create.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
