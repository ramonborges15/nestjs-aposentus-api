'use strict';

/**
 * Escapa caracteres especiais do Markdown v1 do Telegram presentes em
 * conteúdo gerado pelo usuário, evitando erros de parse de entidades.
 */
function escapar(texto) {
    if (!texto) return '';
    return String(texto).replace(/[_*`[]/g, '\\$&');
}

const MENSAGENS = {
    boas_vindas: (nome) =>
        `Olá, ${escapar(nome)}! Eu sou o bot do *Aposentus* 🙏\n\n` +
        `Para vincular sua conta, envie o código gerado no aplicativo com:\n` +
        `\`/vincular CODIGO\`\n\n` +
        `Use /ajuda para ver todos os comandos.`,

    conta_vinculada: (nome) =>
        `✅ Conta vinculada com sucesso, ${escapar(nome)}!\n\n` +
        `Agora você pode:\n` +
        `• Enviar uma mensagem de texto para registrar uma oração\n` +
        `• Usar /oracoes para ver suas orações de hoje\n` +
        `• Usar /ajuda para ver todos os comandos`,

    erro_vinculacao: (motivo) =>
        `❌ Não foi possível vincular sua conta.\n\nMotivo: ${escapar(motivo)}`,

    oracao_registrada: (titulo) =>
        `✅ Oração registrada!\n\nTítulo: ${escapar(titulo)}`,

    erro_oracao: (motivo) =>
        `❌ Não foi possível registrar a oração.\n\nMotivo: ${escapar(motivo)}`,

    sem_oracoes_hoje: () =>
        `🎉 Parabéns! Você não tem orações pendentes para hoje.`,

    oracoes_hoje: (itens) => {
        const lista = itens
            .map((o, i) => `${i + 1}. *${escapar(o.titulo || 'Sem título')}*\n   ${escapar(resumir(o.conteudo, 80))}`)
            .join('\n\n');
        return `📋 *Orações de hoje (${itens.length}):*\n\n${lista}`;
    },

    erro_listar_oracoes: (motivo) =>
        `❌ Não foi possível listar as orações.\n\nMotivo: ${escapar(motivo)}`,

    ajuda: () =>
        `*Comandos disponíveis:*\n\n` +
        `🔗 /vincular CODIGO — Vincula sua conta usando o código gerado no app\n` +
        `📋 /oracoes — Lista as orações pendentes de hoje\n` +
        `✍️ /ajuda — Exibe esta mensagem\n\n` +
        `*Registrar oração:*\nEnvie qualquer mensagem de texto livre e ela será salva como oração.`,

    erro_inesperado: () =>
        `⚠️ Ocorreu um erro inesperado. Tente novamente em instantes.`,

    sem_vinculo: () =>
        `🔒 Sua conta Telegram não está vinculada.\n\n` +
        `Gere um código no aplicativo Aposentus e envie:\n\`/vincular CODIGO\``,
};

function resumir(texto, limite) {
    if (!texto) return '';
    return texto.length > limite ? texto.slice(0, limite) + '…' : texto;
}

module.exports = MENSAGENS;
