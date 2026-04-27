import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export function getDataSourceConfig(configService: ConfigService): DataSourceOptions {
    const host = configService.get<string>('DB_HOST') ?? configService.get<string>('POSTGRES_HOST');
    const port = configService.get<number>('DB_PORT') ?? configService.get<number>('POSTGRES_PORT');
    const username = configService.get<string>('DB_USERNAME') ?? configService.get<string>('POSTGRES_USER');
    const password = configService.get<string>('DB_PASSWORD') ?? configService.get<string>('POSTGRES_PASSWORD');
    const database = configService.get<string>('DB_DATABASE') ?? configService.get<string>('POSTGRES_DB');

    return {
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        synchronize: false,
        entities: [__dirname + '/**/*.entity{.ts,.js}']
    }
}