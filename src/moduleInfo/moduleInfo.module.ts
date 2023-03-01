import { Module } from '@nestjs/common';
import { ModuleInfoService } from './moduleInfo.service';
import { ModuleInfo } from './moduleInfo.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ModuleInfoController } from './moduleInfo.controller';

@Module({
  imports: [SequelizeModule.forFeature([ModuleInfo])],
  providers: [ModuleInfoService],
  controllers: [ModuleInfoController],
  exports: [ModuleInfoService],
})
export class ModuleInfoModule {}
