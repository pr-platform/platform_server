import { Injectable, OnModuleInit, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { roles } from './data/roles';
import { permissions } from './data/permissions';
import { Permission } from './permission.model';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Sequelize } from 'sequelize-typescript';
import { getRolePermissionCollaborateFromData } from './helpers/getRolePermissionCollaborateFromData';
import { ModuleInfoService } from '../moduleInfo/moduleInfo.service';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Permission)
    private permissionModel: typeof Permission,
    private sequelize: Sequelize,
    private moduleInfoService: ModuleInfoService,
  ) {}

  async onModuleInit() {
    const isModuleInit = await this.moduleInfoService.findOne({
      where: {
        name: 'role',
      },
    });

    if (!isModuleInit?.isInit) {
      const t = await this.sequelize.transaction();
      try {
        await this.createRolesAndPermissionsOnInit(roles, permissions);
        await this.moduleInfoService.create({
          name: 'role',
          isInit: true,
        });
        await t.commit();
      } catch (error) {
        await t.rollback();
      }
    }
  }

  async createRoleAndPermissions(rolePermission) {
    const role = await this.findOrCreate(rolePermission.role);

    for await (const permission of rolePermission.permissions) {
      const createdOrFindedPermission = await this.findOrCreatePermission(
        permission,
      );

      if (createdOrFindedPermission && createdOrFindedPermission.length) {
        await role[0].$add('permissions', createdOrFindedPermission[0]);
      }
    }

    return role;
  }

  async createRolesAndPermissionsOnInit(roles, permissions) {
    const rolePermissions = getRolePermissionCollaborateFromData(
      roles,
      permissions,
    );

    for await (const rolePermission of rolePermissions) {
      await this.createRoleAndPermissions(rolePermission);
    }
  }

  async findOrCreate(role: CreateRoleDto) {
    return this.roleModel.findOrCreate({
      where: {
        ...role,
      },
    });
  }

  async createRole(createRoleData: CreateRoleDto) {
    return await this.roleModel.create(createRoleData as any);
  }

  async createRoles(createRoleData: CreateRoleDto[]) {
    return await this.roleModel.bulkCreate(createRoleData as any);
  }

  async findByAlias(alias: string, includePermissions?: boolean) {
    return await this.roleModel.findOne({
      where: {
        alias,
      },
      ...(includePermissions && { include: ['permissions'] }),
    });
  }

  async findById(id: string | number, includePermissions?: boolean) {
    return await this.roleModel.findByPk(id, {
      ...(includePermissions && { include: ['permissions'] }),
    });
  }

  async findAll(includePermissions?: boolean) {
    return await this.roleModel.findAll({
      ...(includePermissions && { include: ['permissions'] }),
    });
  }

  async findAllPermissions() {
    return await this.permissionModel.findAll();
  }

  async findPermissionByAlias(alias: string) {
    return await this.permissionModel.findOne({
      where: {
        alias,
      },
    });
  }

  async findOrCreatePermission(permission: CreatePermissionDto) {
    return this.permissionModel.findOrCreate({
      where: {
        ...permission,
      },
    });
  }

  async createPermission(permission: CreatePermissionDto) {
    return await this.permissionModel.create(permission as any);
  }

  async createPermissions(permissions: CreatePermissionDto[]) {
    return await this.permissionModel.bulkCreate(permissions as any);
  }

  async setPermissions(roleId: number, permissionIds: number[]) {
    try {
      const role = await this.findById(roleId);

      return await role.$add('permissions', permissionIds);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async unsetPermissions(roleId: number, permissionIds: number[]) {
    try {
      const role = await this.findById(roleId);

      return await role.$remove('permissions', permissionIds);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
