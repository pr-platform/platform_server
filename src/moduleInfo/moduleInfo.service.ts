import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateModuleInfoDto } from './dto/create-module-info-dto';
import { Sequelize } from 'sequelize-typescript';
import { ModuleInfo } from './moduleInfo.model';

@Injectable()
export class ModuleInfoService {
  constructor(
    @InjectModel(ModuleInfo)
    private moduleInfoModel: typeof ModuleInfo,
    private sequelize: Sequelize,
  ) {}

  async create(createModuleInfoDto: CreateModuleInfoDto) {
    return await this.moduleInfoModel.create(createModuleInfoDto as any);
  }

  async findOne(where) {
    return await this.moduleInfoModel.findOne(where);
  }
}
