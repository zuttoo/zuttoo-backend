import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { Address } from 'src/addresses/entities/address.entity';

@Injectable()
export class  ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepository:Repository<Client>,
    @InjectRepository(Address) private addressRepository:Repository<Address>,
  ){}

  async createClient(createDto:CreateClientDto):Promise<Client>{
    const existingClient=await this.clientRepository.findOne({
      where:{
        name:createDto.name
      }
    });

    if(existingClient){
      throw new ConflictException(`Client with name ${createDto.name} already exists`);
    }

    try{
    // create and save the client in the database.
    const newClient=this.clientRepository.create({
      name:createDto.name,
      contactPerson:createDto.contactPerson,
      contactNumber:createDto.contactNumber,
      contactEmail:createDto.contactEmail,
      

    });
    if(this.isValidDate(createDto.subscriptionValidity)){
      newClient.subscriptionValidity=createDto.subscriptionValidity;
    };

    await this.clientRepository.save(newClient);

    // create and save the address in the db
    const newAddress=this.addressRepository.create({
      address:createDto.address,
      city:createDto.city,
      state:createDto.state,
      postalCode:createDto.postalCode,
      country:createDto.country,
      client:newClient
    });

    await this.addressRepository.save(newAddress);
    return newClient;

  }catch(error){
    throw new InternalServerErrorException('Failed to create client')
  }


  }

  async updateClient(id:string,updateDto:UpdateClientDto):Promise<Client>{
    const existingClient=await this.clientRepository.findOne({
      where:{id},
      relations:['address']
    });

    if(!existingClient){
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    //check if the new name is already taken by another client
    if(updateDto.name && updateDto.name!==existingClient.name){
      const clientWithNewName=await this.clientRepository.findOne({
        where:{
          name:updateDto.name
        }
      });
      if(clientWithNewName){
        throw new ConflictException(`Client with nae ${updateDto.name} already exists`);
      }
    } 

    try{
      if(updateDto.name) existingClient.name=updateDto.name;
      if (updateDto.contactPerson) existingClient.contactPerson = updateDto.contactPerson;
      if (updateDto.contactNumber) existingClient.contactNumber = updateDto.contactNumber;
      if (updateDto.contactEmail) existingClient.contactEmail = updateDto.contactEmail;
      
      if (updateDto.subscriptionValidity && this.isValidDate(updateDto.subscriptionValidity)) {
        existingClient.subscriptionValidity = updateDto.subscriptionValidity;
      }
  
      // Save updated client
      await this.clientRepository.save(existingClient);

      if (updateDto.address || updateDto.city || updateDto.state || updateDto.postalCode || updateDto.country) {
        if (!existingClient.address) {
          // If client doesn't have an address, create a new one
          existingClient.address = this.addressRepository.create();
        }
  
        if (updateDto.address) existingClient.address.address = updateDto.address;
        if (updateDto.city) existingClient.address.city = updateDto.city;
        if (updateDto.state) existingClient.address.state = updateDto.state;
        if (updateDto.postalCode) existingClient.address.postalCode = updateDto.postalCode;
        if (updateDto.country) existingClient.address.country = updateDto.country;
  
        await this.addressRepository.save(existingClient.address);
      }

      return existingClient;
      
    }catch(error){
      throw new InternalServerErrorException('Failed to update client');
    }

    
  }

  async softDeleteClient(id: string): Promise<void> {
    const result = await this.clientRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not found or already deleted`);
    }
  }

  async getOneClient(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['address'],
      withDeleted: false,
      
    });
    
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    
    return client;
  }

  async getAllClients(includeDeleted: boolean = false): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['address'],
      withDeleted: includeDeleted,
    });
  }

  async restoreClient(id: string): Promise<void> {
    const result = await this.clientRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not found or not deleted`);
    }
  }
  private isValidDate(date:any):boolean{
    if(date instanceof Date){
      return !isNaN(date.getTime());
    }

    if(typeof date==='string' || typeof date==='number'){
      const parsedDate=new Date(date);
      return !isNaN(parsedDate.getTime())
    }

    return false;
    
  }
}
