import { BadRequestException, Injectable } from '@nestjs/common';
import { Supplier } from './entities/supplier.entity';
import { SelectSupplierDto } from './dto/select-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RmSku } from '../orders/entities/rmsku.entity';


@Injectable()
export class SuppliersService {
  constructor(
    // @InjectRepository(Supplier) private supplierRepository:Repository<Supplier>,
    // @InjectRepository(RmSku) private rmskuRepository: Repository<RmSku>,
  ){}



}
