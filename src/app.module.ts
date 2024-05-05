import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OemsModule } from './oems/oems.module';
import { AddressesModule } from './addresses/addresses.module';
import { Aws_seeModule } from './SES_AWS/aws_ses.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        username: configService.get('PGUSER'),
        passsword: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        ssl: true,
        synchronize: true,
        retryAttempts: 3,
        logging: true,
      }),
    }),
    AddressesModule,
    ClientsModule,
    OemsModule,
    SuppliersModule,
    UsersModule,
    Aws_seeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
