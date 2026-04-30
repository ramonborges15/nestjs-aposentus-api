'use strict';

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { handleStart, handleVincular } = require('./handlers/start.handler');
const { handleTextoLivre, handleListarOracoes } = require('./handlers/oracao.handler');
const MENSAGENS = require('./mensagens');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const POLLING_INTERVALO = Number(process.env.POLLING_INTERVALO) || 300;

if (!TOKEN) {
    console.error('[Bot] TELEGRAM_BOT_TOKEN não definido. Configure o arquivo .env antes de iniciar.');
    process.exit(1);
}

const bot = new TelegramBot(TOKEN, {
    polling: {
        interval: POLLING_INTERVALO,
        autoStart: true,
    },
});

// ────────────────────────────────────────────────────
// Registro de comandos (aparece no menu do Telegram)
// ────────────────────────────────────────────────────
bot.setMyCommands([
    { command: 'vincular', description: 'Vincular conta com o código gerado no app' },
    { command: 'oracoes', description: 'Listar orações pendentes de hoje' },
    { command: 'ajuda', description: 'Ver todos os comandos disponíveis' },
]);

// ────────────────────────────────────────────────────
// Roteamento de comandos
// ────────────────────────────────────────────────────

// /start e /start <codigo> (deep link)
bot.onText(/^\/start(?: (.+))?$/, (msg, match) => handleStart(bot, msg, match));

// /vincular <codigo>
bot.onText(/^\/vincular(?: (.+))?$/, (msg, match) => handleVincular(bot, msg, match));

// /oracoes
bot.onText(/^\/oracoes$/, (msg) => handleListarOracoes(bot, msg));

// /ajuda
bot.onText(/^\/ajuda$/, (msg) => {
    bot.sendMessage(msg.chat.id, MENSAGENS.ajuda(), { parse_mode: 'Markdown' });
});

// Texto livre (qualquer mensagem que não seja um comando → oração)
bot.on('message', (msg) => {
    const ehComando = msg.text?.startsWith('/');
    if (!ehComando && msg.text) {
        handleTextoLivre(bot, msg);
    }
});

// ────────────────────────────────────────────────────
// Tratamento global de erros de polling
// ────────────────────────────────────────────────────
bot.on('polling_error', (erro) => {
    // EFATAL só ocorre se o token é inválido; encerra o processo para evitar loops.
    if (erro.code === 'EFATAL') {
        console.error('[Bot] Token inválido ou erro fatal de polling. Encerrando.');
        process.exit(1);
    }
    console.error('[Bot] Erro de polling:', erro.message);
});

bot.on('error', (erro) => {
    console.error('[Bot] Erro geral:', erro.message);
});

// ────────────────────────────────────────────────────
// Encerramento gracioso
// ────────────────────────────────────────────────────
async function encerrar(sinal) {
    console.log(`[Bot] Sinal ${sinal} recebido. Encerrando polling...`);
    await bot.stopPolling();
    console.log('[Bot] Bot encerrado.');
    process.exit(0);
}

process.on('SIGTERM', () => encerrar('SIGTERM'));
process.on('SIGINT', () => encerrar('SIGINT'));

console.log(`[Bot] Aposentus Bot iniciado com polling (intervalo: ${POLLING_INTERVALO}ms)`);
