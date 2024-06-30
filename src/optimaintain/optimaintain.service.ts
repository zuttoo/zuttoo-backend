import { Injectable } from '@nestjs/common';
import { CreateOptimaintainDto } from './dto/create-optimaintain.dto';
import { UpdateOptimaintainDto } from './dto/update-optimaintain.dto';

@Injectable()
export class OptimaintainService {
  create(createOptimaintainDto: CreateOptimaintainDto) {
    return 'This action adds a new optimaintain';
  }

  findAll() {
    return `This action returns all optimaintain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optimaintain`;
  }

  update(id: number, updateOptimaintainDto: UpdateOptimaintainDto) {
    return `This action updates a #${id} optimaintain`;
  }

  remove(id: number) {
    return `This action removes a #${id} optimaintain`;
  }
}
