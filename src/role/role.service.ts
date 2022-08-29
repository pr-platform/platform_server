import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async create(createRoleData: CreateRoleDto) {
    return await this.roleModel.create(createRoleData as any);
  }

  async findByAlias(alias: string) {
    return await this.roleModel.findOne({
      where: {
        alias,
      },
    });
  }

  async findById(id: string | number) {
    return await this.roleModel.findByPk(id);
  }

  async findAll() {
    return await this.roleModel.findAll();
  }
}
