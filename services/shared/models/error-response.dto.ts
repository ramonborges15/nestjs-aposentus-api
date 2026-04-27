import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ValidationErrorDetail {
    @ApiProperty({ example: 'goal_value' })
    field: string;

    @ApiProperty({ type: [String], example: ['goal_value is required for REACH objectives'] })
    errors: string[];
}

export class ErrorResponseDto {
    @ApiProperty({ example: 400 })
    statusCode: number;

    @ApiProperty({ example: 'Você digitou informações inválidas. Por favor, verifique os campos e tente novamente.' })
    message: string;

    @ApiProperty({ example: 'Bad Request' })
    error: string;

    @ApiProperty({ example: '2026-03-06T10:30:00.000Z' })
    timestamp: string;

    @ApiProperty({ example: '/key-results' })
    path: string;

    @ApiPropertyOptional({ type: [ValidationErrorDetail] })
    details?: ValidationErrorDetail[];
}