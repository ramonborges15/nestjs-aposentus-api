import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
    constructor(message: string, details?: unknown) {
        super(
            {
                statusCode: HttpStatus.BAD_REQUEST,
                message,
                details,
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}
