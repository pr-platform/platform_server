import { ModuleInfoModule } from '../moduleInfo/moduleInfo.module';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';
import { Permission } from './permission.model';
import { RolePermission } from './role-permission.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Role, Permission, RolePermission]),
    ModuleInfoModule,
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
