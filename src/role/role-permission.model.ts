import { Permission } from './permission.model';
import { Role } from './role.model';
import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';

@Table
export class RolePermission extends Model {
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @ForeignKey(() => Permission)
  @Column
  permissionId: number;
}
