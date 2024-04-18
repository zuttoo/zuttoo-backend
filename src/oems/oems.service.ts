import { Injectable } from '@nestjs/common';
import { CreateOemDto } from './dto/create-oem.dto';
import { UpdateOemDto } from './dto/update-oem.dto';

@Injectable()
export class OemsService {
  create(createOemDto: CreateOemDto) {
    return 'This action adds a new oem';
  }

  findAll() {
    return `This action returns all oems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} oem`;
  }

  update(id: number, updateOemDto: UpdateOemDto) {
    return `This action updates a #${id} oem`;
  }

  remove(id: number) {
    return `This action removes a #${id} oem`;
  }
}
