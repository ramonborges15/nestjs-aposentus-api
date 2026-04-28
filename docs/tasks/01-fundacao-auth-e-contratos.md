# Task 01 - Fundacao de auth e contratos

## Objetivo
Preparar autenticacao bearer, validacao de entrada e padrao de resposta/erro para todos os endpoints.

## Dependencias
- Task anterior necessaria: nenhuma
- Bloqueios conhecidos: definicao final do formato de erro padrao

## Escopo
### Inclui
- Middleware JWT para endpoints protegidos.
- Padrao de envelope de resposta com `data`.
- Validacao de path/query/body compartilhada.

### Nao inclui
- Regras de negocio de cada endpoint.
- Integracoes externas (Telegram e IA).

## Cobertura do OpenAPI
### Endpoints
- Nenhum endpoint funcional (fundacao)

### Schemas e componentes
- components.securitySchemes.bearerAuth
- components.parameters.OracaoIdPath
- components.parameters.BaseBiblicaIdPath
- components.parameters.SessaoIdPath

## Passos de implementacao
1. Criar middleware de autenticacao e injecao de usuario.
2. Definir camada de validacao e normalizacao de erros.
3. Implementar utilitarios de resposta compartilhados.

## Criterios de aceite
- [ ] Endpoints protegidos exigem bearer valido.
- [ ] Endpoints publicos respeitam `security: []`.
- [ ] Erros de validacao/autorizacao seguem formato unico.

## Testes minimos
- [ ] Teste de acesso autorizado.
- [ ] Teste de erro 401 sem token.
- [ ] Teste de validacao de parametro invalido.

## Riscos e decisoes
- Risco: divergencia de erros entre modulos.
- Mitigacao: centralizar handlers de erro.
- Decisao tecnica: compartilhar middleware e serializador.

## Definicao de pronto
- [ ] Implementacao concluida
- [ ] Testes passando
- [ ] Contrato OpenAPI respeitado
- [ ] Mudancas documentadas
