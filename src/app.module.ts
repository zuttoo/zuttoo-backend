import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './ormconfig';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OemsModule } from './oems/oems.module';
import { AddressesModule } from './addresses/addresses.module';
import { AuthModule } from './auth/auth.module';
import { Aws_seeModule } from './SES_AWS/aws_ses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    AddressesModule,
    ClientsModule,
    OemsModule,
    SuppliersModule,
    UsersModule,
    AuthModule,
    Aws_seeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
