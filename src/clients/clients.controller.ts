import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @UsePipes(new ValidationPipe({whitelist:true}))
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }
  @Get()
  @UsePipes(new ValidationPipe({whitelist:true}))
  getAllClients(){
    return this.clientsService.getAllClients()

  }
  @Get(':id')
  @UsePipes(new ValidationPipe({whitelist:true}))
  getOneClient(@Param('id') id:string){
    return this.clientsService.getOneClient(id)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({whitelist:true}))
  update(@Param('id') id:string, @Body() updateDto:UpdateClientDto){
    return this.clientsService.updateClient(id, updateDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({whitelist:true}))
  softDelete(@Param('id') id:string){
    return this.clientsService.softDeleteClient(id);
  }

  @Post(':id')
  @UsePipes(new ValidationPipe({whitelist:true}))
  restoreClient(@Param('id') id:string){
    return this.clientsService.restoreClient(id);
  }

}
