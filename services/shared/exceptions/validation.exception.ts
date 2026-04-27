import { HttpException, HttpStatus } from '@nestjs/common';

export interface ValidationErrorDetail {
    field: string;
    constraints: string[];
}

export class ValidationException extends HttpException {
    constructor(message: string, details: ValidationErrorDetail[]) {
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
