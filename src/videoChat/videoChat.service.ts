import { Injectable } from '@nestjs/common';
import { RoleService } from '../role/role.service';
import { roles } from './data/roles';
import { permissions } from './data/permissions';
import { Sequelize } from 'sequelize-typescript';
import { ModuleInfoService } from '../moduleInfo/moduleInfo.service';

@Injectable()
export class VideoChatService {
  constructor(
    private roleService: RoleService,
    private sequelize: Sequelize,
    private moduleInfoService: ModuleInfoService,
  ) {}

  async onModuleInit() {
    const isModuleInit = await this.moduleInfoService.findOne({
      where: {
        name: 'video-chat',
      },
    });

    if (!isModuleInit?.isInit) {
      const t = await this.sequelize.transaction();
      try {
        await this.roleService.createRolesAndPermissionsOnInit(
          roles,
          permissions,
        );
        await this.moduleInfoService.create({
          name: 'video-chat',
          isInit: true,
        });
        await t.commit();
      } catch (error) {
        await t.rollback();
      }
    }
  }
}
