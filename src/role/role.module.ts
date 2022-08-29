import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
