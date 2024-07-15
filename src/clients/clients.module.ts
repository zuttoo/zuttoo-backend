import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/addresses/entities/address.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Client, Address])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
