export interface TelegramCodigoLinkResponse {
    code: string;
    expiresAt: Date;
    deepLinkUrl: string;
}

export interface TelegramLinkResponse {
    data: {
        linked: boolean;
        message: string;
    };
}

export interface TelegramStatusResponse {
    data: {
        linked: boolean;
        telegramUserId: string;
        telegramUsername: string;
        linkedAt: Date;
    };
}

export interface TelegramRevokeResponse {
    data: {
        revoked: boolean;
    };
}

export class TelegramViewModel {

    // TODO: implementar mapeamento de entidade para TelegramCodigoLinkResponse
    static toCodigoLinkDto(codigo: string, expiresAt: Date, deepLinkUrl: string): TelegramCodigoLinkResponse {
        return {
            code: codigo,
            expiresAt,
            deepLinkUrl,
        };
    }

    // TODO: implementar mapeamento de resultado de vinculação para TelegramLinkResponse
    static toLinkResponseDto(vinculado: boolean, mensagem: string): TelegramLinkResponse {
        return {
            data: {
                linked: vinculado,
                message: mensagem,
            },
        };
    }

    // TODO: implementar mapeamento de entidade para TelegramStatusResponse
    static toStatusDto(vinculado: boolean, telegramUserId: string, telegramUsername: string, vinculadoEm: Date): TelegramStatusResponse {
        return {
            data: {
                linked: vinculado,
                telegramUserId,
                telegramUsername,
                linkedAt: vinculadoEm,
            },
        };
    }

    // TODO: implementar mapeamento de resultado de revogação para TelegramRevokeResponse
    static toRevokeDto(revogado: boolean): TelegramRevokeResponse {
        return {
            data: {
                revoked: revogado,
            },
        };
    }
}
