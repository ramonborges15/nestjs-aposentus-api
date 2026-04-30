'use strict';

const { vincularConta, mensagemDeErro } = require('../cliente-api');
const MENSAGENS = require('../mensagens');

/**
 * Extrai dados padronizados do remetente de uma mensagem Telegram.
 * Garante que todos os campos obrigatórios pela API estejam preenchidos.
 */
function dadosTelegramDe(msg) {
    return {
        telegramUserId: String(msg.from.id),
        telegramChatId: String(msg.chat.id),
        telegramUsername: msg.from.username || msg.from.first_name || String(msg.from.id),
        telegramFirstName: msg.from.first_name || 'Usuário',
    };
}

/**
 * Trata o comando /start sem código (boas-vindas) e /start <codigo> (vinculação).
 */
async function handleStart(bot, msg, match) {
    const chatId = msg.chat.id;
    const nome = msg.from.first_name || 'Usuário';
    const codigo = match?.[1]?.trim();

    if (!codigo) {
        await bot.sendMessage(chatId, MENSAGENS.boas_vindas(nome), { parse_mode: 'Markdown' });
        return;
    }

    await executarVinculo(bot, msg, codigo);
}

/**
 * Trata o comando /vincular CODIGO explicitamente enviado pelo usuário.
 */
async function handleVincular(bot, msg, match) {
    const chatId = msg.chat.id;
    const codigo = match?.[1]?.trim();

    if (!codigo) {
        await bot.sendMessage(
            chatId,
            '⚠️ Informe o código após o comando. Exemplo:\n`/vincular A1B2C3D4`',
            { parse_mode: 'Markdown' },
        );
        return;
    }

    await executarVinculo(bot, msg, codigo);
}

async function executarVinculo(bot, msg, codigo) {
    const chatId = msg.chat.id;
    const nome = msg.from.first_name || 'Usuário';
    const dados = dadosTelegramDe(msg);

    try {
        await vincularConta({ codigo, ...dados });
        await bot.sendMessage(chatId, MENSAGENS.conta_vinculada(nome), { parse_mode: 'Markdown' });
    } catch (erro) {
        const motivo = mensagemDeErro(erro);
        await bot.sendMessage(chatId, MENSAGENS.erro_vinculacao(motivo), { parse_mode: 'Markdown' });
    }
}

module.exports = { handleStart, handleVincular };
