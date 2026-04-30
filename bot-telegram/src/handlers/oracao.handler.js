'use strict';

const { adicionarOracao, listarOracoesHoje, mensagemDeErro } = require('../cliente-api');
const MENSAGENS = require('../mensagens');

/**
 * Registra uma oração a partir de mensagem de texto livre.
 * O texto completo vira o conteúdo da oração.
 */
async function handleTextoLivre(bot, msg) {
    const chatId = msg.chat.id;
    const telegramUserId = String(msg.from.id);
    const conteudo = msg.text?.trim();

    if (!conteudo) return;

    try {
        const resposta = await adicionarOracao({ telegramUserId, conteudo });
        const titulo = resposta.data?.data?.titulo || 'Oração via Telegram';
        await bot.sendMessage(chatId, MENSAGENS.oracao_registrada(titulo), { parse_mode: 'Markdown' });
    } catch (erro) {
        const status = erro.response?.status;

        if (status === 404) {
            await bot.sendMessage(chatId, MENSAGENS.sem_vinculo(), { parse_mode: 'Markdown' });
            return;
        }

        const motivo = mensagemDeErro(erro);
        await bot.sendMessage(chatId, MENSAGENS.erro_oracao(motivo), { parse_mode: 'Markdown' });
    }
}

/**
 * Lista as orações pendentes do usuário para o dia de hoje.
 */
async function handleListarOracoes(bot, msg) {
    const chatId = msg.chat.id;
    const telegramUserId = String(msg.from.id);

    try {
        const resposta = await listarOracoesHoje(telegramUserId);
        const itens = resposta.data?.data ?? [];

        if (itens.length === 0) {
            await bot.sendMessage(chatId, MENSAGENS.sem_oracoes_hoje(), { parse_mode: 'Markdown' });
            return;
        }

        await bot.sendMessage(chatId, MENSAGENS.oracoes_hoje(itens), { parse_mode: 'Markdown' });
    } catch (erro) {
        const status = erro.response?.status;

        if (status === 404) {
            await bot.sendMessage(chatId, MENSAGENS.sem_vinculo(), { parse_mode: 'Markdown' });
            return;
        }

        const motivo = mensagemDeErro(erro);
        await bot.sendMessage(chatId, MENSAGENS.erro_listar_oracoes(motivo), { parse_mode: 'Markdown' });
    }
}

module.exports = { handleTextoLivre, handleListarOracoes };
