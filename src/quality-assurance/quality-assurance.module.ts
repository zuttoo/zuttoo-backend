import { Module } from '@nestjs/common';
import { QualityAssuranceService } from './quality-assurance.service';
import { QualityAssuranceController } from './quality-assurance.controller';
import { RmSkuCharacteristics } from './entities/rmsku-characteristics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([RmSkuCharacteristics])],
  controllers: [QualityAssuranceController],
  providers: [QualityAssuranceService],
})
export class QualityAssuranceModule {}
