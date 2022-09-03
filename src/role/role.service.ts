import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';
import { roles } from './data/roles';
import { permissions } from './data/permissions';
import { Permission } from './permission.model';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Sequelize } from 'sequelize-typescript';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(Permission)
    private permissionModel: typeof Permission,
    private sequelize: Sequelize,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    console.log('role module');
    const rolePermissions = {};

    permissions.forEach((permission) => {
      permission.roles.forEach((role) => {
        if (!rolePermissions[role]) {
          rolePermissions[role] = [];
        }

        rolePermissions[role].push({
          alias: permission.alias,
          title: permission.title,
        });
      });
    });

    const t = await this.sequelize.transaction();

    try {
      for await (const role of roles) {
        const existRole = await this.findByAlias(role.alias);

        if (!existRole) {
          const createdRole = await this.create(role);

          const permissions =
            rolePermissions[(createdRole as any).dataValues.alias];

          if (permissions && permissions.length) {
            for await (const permission of permissions) {
              let existPermission = await this.findPermissionByAlias(
                permission.alias,
              );

              if (!existPermission) {
                existPermission = await this.createPermission(permission);
              }

              await createdRole.$add('permissions', existPermission);
            }
          }
        }
      }

      const adminData = {
        email: this.configService.get('ADMIN_EMAIL'),
        password: this.configService.get('ADMIN_PASSWORD'),
      };

      let admin = await this.userService.findByEmailAndPassword(adminData);

      if (!admin) {
        admin = await this.userService.create(adminData)
      }

      const adminRole = await this.findByAlias('admin');

      await adminRole.$add('users', admin);
      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  }

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

  async findPermissionByAlias(alias: string) {
    return await this.permissionModel.findOne({
      where: {
        alias,
      },
    });
  }

  async createPermission(permission: CreatePermissionDto) {
    return await this.permissionModel.create(permission as any);
  }

  async createPermissions(permissions: CreatePermissionDto[]) {
    return await this.permissionModel.bulkCreate(permissions as any);
  }
}
