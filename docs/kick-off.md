# Kick-off
O objetivo aqui é ter um template que vai servir de base para gerar o openapi.

Autenticação: Bearer token (JWT) é exigida para todos os endpoints, exceto os relacionados à integração com o Telegram. Para esses, a autenticação é feita via código de vinculação temporário.

## Nome do projeto
Aposentus - API

## Descrição
Gerenciamento de vida de oração. Esta API fornece os recursos para cadastro e organização de orações, controle de sessões com cronômetro, integração com o bot do Telegram, geração de orações por IA com base em fundamentos bíblicos e análise da consistência e equilíbrio na vida de oração.

## Endpoints

### Orações

#### GET /v1/oracoes/{id}
Buscar uma oração por ID.

Response:

```json
{
    "data": {
        "id": "serial",
        "criado_em": "timestamp",
        "atualizado_em": "timestamp",
        "titulo": "string",
        "conteudo": "string",
        "tema": "string",
        "tipo": "PEDIDO | INTERCESSAO | AGRADECIMENTO | CONFISSAO",
        "dia_semana": "number",
        "dia_mes": "number",
        "frequencia": "DIARIA | SEMANAL | MENSAL",
        "quantidade_maxima": "number",
        "total_oracoes": "number", // pode ser not null. Default é 0
        "ativa": "boolean",
        "user_id": "uuid"  
    }
}
```

#### GET /v1/oracoes?periodo=dia&orderBy=DESC
Visualizar minhas orações por período (dia apenas) e ordenação (ascendente ou descendente).

Response:

```json
{
    "data": [
        {
            "id": "serial",
            "criado_em": "timestamp",
            "atualizado_em": "timestamp",
            "titulo": "string",
            "conteudo": "string",
            "tema": "string",
            "tipo": "PEDIDO | INTERCESSAO | AGRADECIMENTO | CONFISSAO",
            "dia_semana": "number",
            "dia_mes": "number",
            "frequencia": "DIARIA | SEMANAL | MENSAL",
            "quantidade_maxima": "number",
            "total_oracoes": "number", // deve ser not null. Default é 0
            "ativa": "boolean",
            "user_id": "uuid"  
        },
        // ...
    ],
    "page": "number",
    "size": "number",
    "totalItems": "number",
    "totalPages": "number"
}
```

#### POST /v1/oracoes
Criar uma nova oração.

Request:

```json
{
    "titulo": "string",
    "conteudo": "string",
    "tema": "string",
    "tipo": "PEDIDO | INTERCESSAO | AGRADECIMENTO | CONFISSAO",
    "dia_semana": "number",
    "dia_mes": "number",
    "frequencia": "DIARIA | SEMANAL | MENSAL",
    "quantidade_maxima": "number", // esse campo é opcional.
}
```

Response:

```json
{
    "data": {
        "id": "serial",
        "criado_em": "timestamp",
        "atualizado_em": "timestamp",
        "titulo": "string",
        "conteudo": "string",
        "tema": "string",
        "tipo": "PEDIDO | INTERCESSAO | AGRADECIMENTO | CONFISSAO",
        "dia_semana": "number",
        "dia_mes": "number",
        "frequencia": "DIARIA | SEMANAL | MENSAL",
        "quantidade_maxima": "number", // deve ser not null. Default é 0
        "total_oracoes": "number", // deve ser not null. Default é 0
        "ativa": "boolean",
        "user_id": "uuid"  
    }
}
```

#### POST /v1/oracoes/gerar-por-ia
Gerar uma oração a partir de textos bíblicos e mensagens, que serão passados via body.

Request:

```json
{
    "textos_biblicos": [
        {
            "referencia": "Salmos 23:1", // opcional
            "texto": "O Senhor e o meu pastor; nada me faltara." // obrigatório no item
        }
    ],
    "dia_semana": "number",
    "dia_mes": "number",
    "frequencia": "DIARIA | SEMANAL | MENSAL",
    "quantidade_maxima": "number", // esse campo é opcional.
}
```

Regras:
- `textos_biblicos` é obrigatório e deve ter pelo menos 1 item.
- Cada item de `textos_biblicos` deve ter `texto` preenchido.
- Esse endpoint cria e persiste uma nova oração.

Response:

```json
{
    "data": {
        "mensagem": "Processo de geração iniciado. A oração estará disponível em alguns minutos.",
    }
}
```


#### POST /v1/oracoes/{id}/gerar-por-ia
Gerar uma oração a partir de uma oração já criada.

Request:

```json
{
    "textos_biblicos": [
        {
            "referencia": "Filipenses 4:6-7", // opcional
            "texto": "Nao andeis ansiosos por coisa alguma..." // obrigatório no item
        }
    ],
    "dia_semana": "number",
    "dia_mes": "number",
    "frequencia": "DIARIA | SEMANAL | MENSAL",
    "quantidade_maxima": "number", // esse campo é opcional.
}
```

Regras:
- Cria uma nova versao da oração vinculada ao `id` informado na URL.
- Nao sobrescreve a versao anterior.
- `textos_biblicos` e obrigatório e deve ter pelo menos 1 item com `texto` preenchido.

Response:

```json
{
    "data": {
        "mensagem": "Processo de geração iniciado. A oração estará disponível em alguns minutos.",
    }
}
```

#### PUT /v1/oracoes/{id}
Editar uma oração existente.

Request:

```json
{
    "titulo": "string",
    "conteudo": "string",
    "tema": "string",
    "tipo": "PEDIDO | INTERCESSAO | AGRADECIMENTO | CONFISSAO",
    "dia_semana": "number",
    "dia_mes": "number",
    "frequencia": "DIARIA | SEMANAL | MENSAL",
    "quantidade_maxima": "number", // esse campo é opcional.
}
```

Response:

```json
{
    "data": {
        "id": "serial",
        "criado_em": "timestamp",
        "atualizado_em": "timestamp",
        "titulo": "string",
        "conteudo": "string",
        "tema": "string",
        "tipo": "PEDIDO | INTERCESSAO | AGRADECIMENTO | CONFISSAO",
        "dia_semana": "number",
        "dia_mes": "number",
        "frequencia": "DIARIA | SEMANAL | MENSAL",
        "quantidade_maxima": "number", // deve ser not null. Default é 0
        "total_oracoes": "number", // deve ser not null. Default é 0
        "ativa": "boolean",
        "user_id": "uuid"  
    }
}
```

#### PUT /v1/oracoes/{id}/registro-evento
Registrar que uma oração foi feita.

Response:

```json
{
    "data": {
        "registrado_em": "timestamp"
    }
}
```

#### DELETE /v1/oracoes/{id}
Deletar uma oração existente.

### Base bíblica de apoio
Essa base é composta por textos bíblicos que servem de apoio para as orações.

#### GET /v1/base-biblica/{id}
Buscar um texto bíblico de apoio por ID.

Response:

```json
{
    "data": {
        "id": "serial",
        "criado_em": "timestamp",
        "atualizado_em": "timestamp",
        "referencia": "string", // Exemplo: "João 3:16". Pode ser nulo.
        "tema": ["string"], // Um array de temas relacionados ao texto bíblico
        "texto": "string"
    }
}
```

#### GET /v1/base-biblica?tema=medo&page=1&size=10
Listar textos por filtros.

Response:

```json
{
    "data": [
        {
            "id": "serial",
            "criado_em": "timestamp",
            "atualizado_em": "timestamp",
            "referencia": "string", // Exemplo: "João 3:16". Pode ser nulo.
            "tema": ["string"], // Um array de temas relacionados ao texto bíblico
            "texto": "string"
        },
        // ...
    ],
    "page": "number",
    "size": "number",
    "totalItems": "number",
    "totalPages": "number"
}
```

#### POST /v1/base-biblica
Cadastrar textos bíblicos de apoio.

Request:

```json
{
    "referencia": "string", // Exemplo: "João 3:16". Pode ser nulo.
    "tema": ["string"], // Um array de temas relacionados ao texto bíblico
    "texto": "string"
}
```

Response:

```json
{
    "data": {
        "id": "serial",
        "criado_em": "timestamp",
        "atualizado_em": "timestamp",
        "referencia": "string", // Exemplo: "João 3:16". Pode ser nulo.
        "tema": ["string"], // Um array de temas relacionados ao texto bíblico
        "texto": "string"
    }
}
```

#### PUT /v1/base-biblica/{id}
Editar um texto bíblico de apoio existente.

Request:

```json
{
    "referencia": "string", // Exemplo: "João 3:16". Pode ser nulo.
    "tema": ["string"], // Um array de temas relacionados ao texto bíblico
    "texto": "string"
}
```

Response:

```json
{
    "data": {
        "id": "serial",
        "criado_em": "timestamp",
        "atualizado_em": "timestamp",
        "referencia": "string", // Exemplo: "João 3:16". Pode ser nulo.
        "tema": ["string"], // Um array de temas relacionados ao texto bíblico
        "texto": "string"
    }
}
```

#### DELETE /v1/base-biblica/{id}
Deletar um texto bíblico de apoio existente.


### Sessões
Cada seção está ligada a uma oração e usuário. Assim, uma seção pode ter várias orações e uma oração pode estar em várias sessões.

#### POST /v1/sessoes
Inicializar uma nova sessão de oração. Vou passar um array de IDs de orações.

Request:

```json
{
    "oracao_ids": ["number"]
}
```

Response:
```json
{
    "data": [
        {
            "id": "serial",
            "criado_em": "timestamp",
            "atualizado_em": "timestamp",
            "data_dia": "date",
            "finalizado": "boolean",
            "oracao_id": "number"
        }
    ]
}
```

#### PUT /v1/sessoes/{id}?evento=finalizar
Finalizar uma sessão de oração existente.

Response:

```json
{
    "data": {
        "id": "serial",
        "criado_em": "timestamp",
        "atualizado_em": "timestamp",
        "finalizado_em": "timestamp",
        "data_dia": "date",
        "finalizado": "boolean",
        "oracao_id": "number"
    }
}
```

### Integrações

#### POST /v1/me/integracoes/telegram/codigo-link
Gerar um código único e temporário de vinculação

Response:
```json
{
  "code": "TG-LINK-8F3K2A",
  "expiresAt": "2026-04-13T22:00:00Z",
  "deepLinkUrl": "https://t.me/aposentus_bot?start=TG-LINK-8F3K2A"
}
```

#### POST /v1/integracoes/telegram/link
Consumir o código recebido no /start <código> e vincular a conta Telegram

Request:
```json
Body
{
  "data": {
    "code": "TG-LINK-8F3K2A",
    "telegramUserId": "123456789",
    "telegramChatId": "123456789",
    "telegramUsername": "usuario_exemplo",
    "telegramFirstName": "João"
  }
}
```

Response:
```json
Response
{
  "data": {
    "linked": true,
    "message": "Conta vinculada com sucesso"
  }
}
```
#### GET /v1/me/integracoes/telegram
Consultar status da integração atual

Response:
```json
{
  "data": {
    "linked": true,
    "telegramUserId": "123456789",
    "telegramUsername": "usuario_exemplo",
    "linkedAt": "2026-04-13T20:10:00Z"
    }
}
```

#### DELETE /v1/me/integracoes/telegram/link
Desvincular ou revogar o acesso do Telegram

Response:
```json
{
  "data": {
    "revoked": true
    }
}
```