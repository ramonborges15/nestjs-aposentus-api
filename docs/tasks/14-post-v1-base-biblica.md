# Task 14 - POST /v1/base-biblica

## Objetivo
Cadastrar um novo texto biblico de apoio e retornar o recurso criado.

## Dependencias
- Task anterior necessaria: 01-fundacao-auth-e-contratos.md
- Bloqueios conhecidos: deduplicacao por referencia+texto nao definida

## Escopo
### Inclui
- Validacao de `BaseBiblicaUpsertRequest`.
- Persistencia do recurso.
- Retorno em `BaseBiblicaSingleResponse`.

### Nao inclui
- Importacao em lote.
- Moderacao de conteudo.

## Cobertura do OpenAPI
### Endpoints
- POST /v1/base-biblica

### Schemas e componentes
- components.schemas.BaseBiblicaUpsertRequest
- components.schemas.BaseBiblica
- components.schemas.BaseBiblicaSingleResponse

## Passos de implementacao
1. Validar payload com `tema` e `texto` obrigatorios.
2. Criar registro no repositprio correspondente.
3. Retornar recurso criado em envelope `data`.

## Criterios de aceite
- [ ] Retorna 200 com recurso criado.
- [ ] Rejeita payload invalido.
- [ ] Mantem estrutura de resposta conforme contrato.

## Testes minimos
- [ ] Teste de sucesso principal.
- [ ] Teste de validacao/erro de entrada.
- [ ] Teste de autorizacao (quando aplicavel).

## Riscos e decisoes
- Risco: entradas duplicadas degradam qualidade da base.
- Mitigacao: regras de unicidade semantica quando necessario.
- Decisao tecnica: validação de tamanho minimo para texto.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
