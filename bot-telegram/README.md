# Bot Telegram — Aposentus

Bot para integração com a API Aposentus via Telegram. Permite vincular uma conta de usuário, registrar orações por mensagem de texto e consultar as orações pendentes do dia.

---

## Pré-requisitos

| Requisito | Versão mínima |
|-----------|--------------|
| Node.js   | 20           |
| API Aposentus rodando | — |
| Bot criado no @BotFather | — |

---

## Criando o bot no Telegram (primeira vez)

1. Abra o Telegram e procure por `@BotFather`
2. Envie `/newbot`
3. Escolha um nome de exibição (ex: `Aposentus`)
4. Escolha um username terminado em `bot` (ex: `aposentus_bot`)
5. O BotFather retornará um **token** no formato `123456789:ABCDEFGhijklmn...`
6. Guarde esse token — ele será usado na variável `TELEGRAM_BOT_TOKEN`

> O username escolhido deve corresponder ao `TELEGRAM_BOT_USERNAME` configurado na API (`services/envs/development.env`).

---

## Instalação

```bash
cd bot-telegram
npm install
```

---

## Configuração

Copie o arquivo de exemplo e preencha com seus valores:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
# Token obtido com @BotFather
TELEGRAM_BOT_TOKEN=123456789:ABCDEFGhijklmn...

# URL base da API Aposentus (sem barra no final)
API_BASE_URL=http://localhost:3333

# (opcional) Intervalo de polling em ms. Padrão: 300
# POLLING_INTERVALO=300
```

---

## Execução

### Desenvolvimento (com reload automático)

```bash
npm run dev
```

### Produção

```bash
npm start
```

O bot exibe no console:
```
[Bot] Aposentus Bot iniciado com polling (intervalo: 300ms)
```

---

## Fluxo de uso ponta a ponta

### 1. Gerar código de vinculação (na API, com JWT)

```bash
curl -X POST http://localhost:3333/v1/me/integracoes/telegram/codigo-link \
  -H "Authorization: Bearer <JWT>"
```

Resposta:
```json
{
  "code": "A1B2C3D4",
  "expiresAt": "2026-04-30T12:30:00.000Z",
  "deepLinkUrl": "https://t.me/aposentus_bot?start=A1B2C3D4"
}
```

O código expira em **15 minutos**.

### 2. Vincular conta no Telegram

Abra o `deepLinkUrl` no Telegram ou:

1. Procure pelo bot (`@aposentus_bot`) no Telegram
2. Inicie uma conversa e envie `/vincular A1B2C3D4`

O bot chama o endpoint `POST /v1/integracoes/telegram/link` e responde com confirmação de sucesso ou o motivo do erro.

### 3. Registrar uma oração

Após vinculado, envie qualquer mensagem de texto no chat do bot:

```
Senhor, peço proteção e paz para minha família hoje.
```

O bot registra a mensagem como oração com `tema=telegram`, `tipo=PEDIDO` e `frequencia=DIARIA`.

### 4. Consultar orações do dia

Envie o comando `/oracoes` no chat do bot.

O bot retorna a lista de orações pendentes para o dia atual, filtrando por frequência (diária, semanal e mensal) e excluindo as já rezadas em sessões finalizadas.

---

## Comandos disponíveis

| Comando | Descrição |
|---------|-----------|
| `/vincular CODIGO` | Vincula a conta Telegram ao usuário do app usando o código gerado |
| `/oracoes` | Lista as orações pendentes para hoje |
| `/ajuda` | Exibe os comandos disponíveis |
| _(texto livre)_ | Registra a mensagem como oração |

---

## Estrutura de arquivos

```
bot-telegram/
├── .env.example              # Modelo de variáveis de ambiente
├── .gitignore
├── package.json
└── src/
    ├── index.js              # Bootstrap: polling e roteamento de comandos
    ├── cliente-api.js        # Cliente HTTP da API (com retry exponencial)
    ├── mensagens.js          # Textos de resposta do bot em pt-BR
    └── handlers/
        ├── start.handler.js  # Handles /start e /vincular
        └── oracao.handler.js # Handles texto livre e /oracoes
```

---

## Endpoints da API consumidos pelo bot

Todos os endpoints públicos abaixo **não exigem JWT**.

| Método | Endpoint | Usado em |
|--------|----------|----------|
| `POST` | `/v1/integracoes/telegram/link` | Vincular conta |
| `POST` | `/v1/integracoes/telegram/bot/oracoes` | Registrar oração |
| `GET`  | `/v1/integracoes/telegram/bot/oracoes/hoje?telegramUserId=` | Listar orações do dia |

O endpoint de geração de código (`POST /v1/me/integracoes/telegram/codigo-link`) é chamado **pelo app do usuário** com JWT, não pelo bot.

---

## Erros comuns

| Situação | Causa | Solução |
|----------|-------|---------|
| `TELEGRAM_BOT_TOKEN não definido` | Arquivo `.env` ausente ou sem token | Criar `.env` a partir do `.env.example` |
| `Token inválido ou erro fatal` | Token incorreto ou revogado | Gerar novo token no `@BotFather` |
| Código inválido ou expirado | Código de 15 min vencido | Gerar novo código no app |
| Conta não vinculada | Usuário tenta usar o bot sem ter vinculado | Seguir o fluxo de vinculação |
| API indisponível | Serviço NestJS fora do ar | O bot tenta 3x com backoff e exibe mensagem amigável |
