import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LoggingInterceptor } from 'shared/interceptors/logging.interceptor';
import configuration from './../config/config';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { getDataSourceConfig } from './ormconfig';
import { LoggerService } from './modules/logger/logger.service';
import { UserModule } from './modules/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true // Make the configuration global
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = getDataSourceConfig(configService);
        const logger = new LoggerService('DatabaseConfig');
        logger.log(`NODE_ENV: ${configService.get<string>('NODE_ENV')}`);

        return dbConfig;
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_SMTP_HOSTNAME'),
          secure: false,
          port: configService.get<number>('MAIL_PORT'),
          auth: {
            user: configService.get<string>('MAIL_USERNAME'),
            pass: configService.get<string>('MAIL_PASSWORD')
          },
          ignoreTLS: false
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM')
        },
        template: {
          dir: __dirname + '/../src/shared/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      })
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return [
          {
            rootPath: join(__dirname, '..', '..', `${configService.get<string>('MULTER_DEST')}`),
            serveRoot: `/${configService.get<string>('MULTER_DEST')}`
          },
        ];
      },
    }),

    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule { }
