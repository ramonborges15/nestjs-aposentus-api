import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express';
import { LoggerService } from "src/modules/logger/logger.service";
import { ValidationErrorDetail } from "shared/models/error-response.dto";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly loggerService = new LoggerService('HttpExceptionFilter');
    private readonly statusNames: Record<number, string> = {
        [HttpStatus.BAD_REQUEST]: 'Bad Request',
        [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
        [HttpStatus.FORBIDDEN]: 'Forbidden',
        [HttpStatus.NOT_FOUND]: 'Not Found',
        [HttpStatus.CONFLICT]: 'Conflict',
        [HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
        [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    };

    private getHttpErrorName(status: number): string {
        return this.statusNames[status] ?? 'Internal Server Error';
    }

    private normalizeMessage(exceptionBody: unknown, status: number): string {
        if (typeof exceptionBody === 'string') {
            return exceptionBody;
        }

        if (exceptionBody && typeof exceptionBody === 'object') {
            const body = exceptionBody as { message?: unknown };

            if (typeof body.message === 'string') {
                return body.message;
            }

            if (Array.isArray(body.message)) {
                const mapped = body.message
                    .map((item) => typeof item === 'string' ? item : JSON.stringify(item))
                    .filter(Boolean);

                if (mapped.length > 0) {
                    return mapped.join('; ');
                }
            }
        }

        return this.getHttpErrorName(status);
    }

    private extractDetails(exceptionBody: unknown): ValidationErrorDetail[] | undefined {
        if (!exceptionBody || typeof exceptionBody !== 'object') {
            return undefined;
        }

        const body = exceptionBody as {
            details?: unknown;
            errors?: unknown;
            message?: unknown;
        };

        const details = body.details ?? body.errors;
        if (Array.isArray(details)) {
            const normalized = details
                .filter((item) => !!item && typeof item === 'object')
                .map((item) => {
                    const entry = item as { field?: unknown; errors?: unknown; constraints?: unknown };

                    const field = typeof entry.field === 'string' ? entry.field : '';
                    const errors = Array.isArray(entry.errors)
                        ? entry.errors.filter((msg): msg is string => typeof msg === 'string')
                        : Array.isArray(entry.constraints)
                            ? entry.constraints.filter((msg): msg is string => typeof msg === 'string')
                            : [];

                    return { field, errors };
                })
                .filter((item) => item.field && item.errors.length > 0);

            if (normalized.length > 0) {
                return normalized;
            }
        }

        if (Array.isArray(body.message)) {
            const normalized = body.message
                .filter((item) => !!item && typeof item === 'object')
                .map((item) => {
                    const entry = item as { field?: unknown; errors?: unknown };
                    const field = typeof entry.field === 'string' ? entry.field : '';
                    const errors = Array.isArray(entry.errors)
                        ? entry.errors.filter((msg): msg is string => typeof msg === 'string')
                        : [];

                    return { field, errors };
                })
                .filter((item) => item.field && item.errors.length > 0);

            if (normalized.length > 0) {
                return normalized;
            }
        }

        return undefined;
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : 500;

        this.loggerService.error(`[${request.method}] ${request.url} > ${status}`);
        if (exception instanceof Error) {
            this.loggerService.error(exception.stack || 'No stack trace available');
        }
        // this.loggerService.debug(`Body: ${JSON.stringify(request.body)}`);
        // this.loggerService.debug(`Params: ${JSON.stringify(request.params)}`);
        // this.loggerService.debug(`Query: ${JSON.stringify(request.query)}`);
        // this.loggerService.debug(`Headers: ${JSON.stringify(request.headers)}`);
        // this.loggerService.debug(`---------------------------------------------------`);

        let exceptionBody: unknown;
        try {
            exceptionBody = exception instanceof HttpException
                ? exception.getResponse()?.valueOf()
                : exception;
        } catch (error) {
            exceptionBody = exception instanceof Error ? exception.message : 'Internal Server Error';
        }

        const message = this.normalizeMessage(exceptionBody, status);
        const details = this.extractDetails(exceptionBody);
        const error = this.getHttpErrorName(status);

        response
            .status(status)
            .json({
                statusCode: status,
                message,
                error,
                timestamp: new Date().toISOString(),
                path: request.url,
                ...(details ? { details } : {})
            });
    }
}