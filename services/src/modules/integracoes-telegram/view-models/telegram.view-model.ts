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
        linkedAt: Date | null;
    };
}

export interface TelegramRevokeResponse {
    data: {
        revoked: boolean;
    };
}

export class TelegramViewModel {

    static toCodigoLinkDto(codigo: string, expiresAt: Date, deepLinkUrl: string): TelegramCodigoLinkResponse {
        return {
            code: codigo,
            expiresAt,
            deepLinkUrl,
        };
    }

    static toLinkResponseDto(vinculado: boolean, mensagem: string): TelegramLinkResponse {
        return {
            data: {
                linked: vinculado,
                message: mensagem,
            },
        };
    }

    static toStatusDto(vinculado: boolean, telegramUserId: string, telegramUsername: string, vinculadoEm: Date | null): TelegramStatusResponse {
        return {
            data: {
                linked: vinculado,
                telegramUserId,
                telegramUsername,
                linkedAt: vinculadoEm,
            },
        };
    }

    static toRevokeDto(revogado: boolean): TelegramRevokeResponse {
        return {
            data: {
                revoked: revogado,
            },
        };
    }
}
