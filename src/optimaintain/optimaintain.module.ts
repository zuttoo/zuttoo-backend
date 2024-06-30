import { Module } from '@nestjs/common';
import { OptimaintainService } from './optimaintain.service';
import { OptimaintainController } from './optimaintain.controller';

@Module({
  controllers: [OptimaintainController],
  providers: [OptimaintainService],
})
export class OptimaintainModule {}
