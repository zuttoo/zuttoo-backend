import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OemsModule } from './oems/oems.module';
import { AddressesModule } from './addresses/addresses.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        // passsword: configService.get('DB_PASSWORD'),
        password:"secret",  //remove befor prod
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        // remove synchronize true before pushing to main
        synchronize: true,
        retryAttempts: 3,
        logging: true,
      }),
    }),
    ClientsModule,
    SuppliersModule,
    OemsModule,
    UsersModule,
    AddressesModule,
  
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
