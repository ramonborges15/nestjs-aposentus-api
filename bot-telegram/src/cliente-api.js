'use strict';

require('dotenv').config();
const axios = require('axios');

const URL_BASE = process.env.API_BASE_URL || 'http://localhost:3333';
const TENTATIVAS_MAXIMAS = 3;
const ATRASO_BASE_MS = 500;

const clienteHttp = axios.create({
    baseURL: URL_BASE,
    timeout: 10_000,
    headers: { 'Content-Type': 'application/json' },
});

/**
 * Executa uma requisição com retry exponencial para erros 5xx ou falhas de rede.
 */
async function comRetry(fn, tentativa = 1) {
    try {
        return await fn();
    } catch (erro) {
        const statusHttp = erro.response?.status;
        const ehErroTransitorio = !statusHttp || statusHttp >= 500;

        if (ehErroTransitorio && tentativa < TENTATIVAS_MAXIMAS) {
            const atraso = ATRASO_BASE_MS * 2 ** (tentativa - 1);
            await new Promise((r) => setTimeout(r, atraso));
            return comRetry(fn, tentativa + 1);
        }

        throw erro;
    }
}

/**
 * Mapeia erros HTTP para mensagens amigáveis em pt-BR.
 */
function mensagemDeErro(erro) {
    const status = erro.response?.status;
    const mensagemApi = erro.response?.data?.message;

    if (mensagemApi) return mensagemApi;

    if (status === 400) return 'Código inválido ou expirado. Gere um novo código no aplicativo.';
    if (status === 404) return 'Conta Telegram não vinculada. Use o link gerado no aplicativo para vincular.';
    if (status >= 500) return 'Serviço temporariamente indisponível. Tente novamente em alguns instantes.';
    if (!status) return 'Não foi possível conectar à API. Verifique se o servidor está em execução.';

    return 'Erro inesperado. Tente novamente.';
}

/**
 * Vincula conta Telegram ao usuário via código temporário.
 */
async function vincularConta({ codigo, telegramUserId, telegramChatId, telegramUsername, telegramFirstName }) {
    return comRetry(() =>
        clienteHttp.post('/v1/integracoes/telegram/link', {
            data: {
                code: codigo,
                telegramUserId,
                telegramChatId,
                telegramUsername,
                telegramFirstName,
            },
        }),
    );
}

/**
 * Cria uma nova oração vinculada ao usuário Telegram.
 */
async function adicionarOracao({ telegramUserId, conteudo, titulo }) {
    return comRetry(() =>
        clienteHttp.post('/v1/integracoes/telegram/bot/oracoes', {
            telegramUserId,
            conteudo,
            titulo,
        }),
    );
}

/**
 * Retorna as orações de hoje do usuário Telegram.
 */
async function listarOracoesHoje(telegramUserId) {
    return comRetry(() =>
        clienteHttp.get('/v1/integracoes/telegram/bot/oracoes/hoje', {
            params: { telegramUserId },
        }),
    );
}

module.exports = { vincularConta, adicionarOracao, listarOracoesHoje, mensagemDeErro };
