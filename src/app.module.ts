import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ENV: Joi.string()
          .valid('development', 'test', 'sandbox', 'production')
          .default('development'),
        APP_PORT: Joi.number().port().default(8080),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number(),
        DB_PASSWORD: Joi.string(),
        DB_USER: Joi.string(),
        DB_NAME: Joi.string(),
        SMTP_HOST: Joi.string(),
        SMTP_PORT: Joi.string(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'pass',
      username: 'postgres',
      entities: [],
      database: 'zuttoo',
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
