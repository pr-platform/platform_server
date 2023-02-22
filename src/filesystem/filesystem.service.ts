import { Injectable } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { roles } from './data/roles';
import { permissions } from './data/permissions';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class FilesystemService {
  constructor(private roleService: RoleService, private sequelize: Sequelize) {}

  async onModuleInit() {
    const t = await this.sequelize.transaction();
    try {
      await this.roleService.createRolesAndPermissionsOnInit(
        roles,
        permissions,
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  }
}
