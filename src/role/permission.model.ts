import { Role } from './role.model';
import { RolePermission } from './role-permission.model';

import {
  Column,
  Model,
  Table,
  Index,
  BelongsToMany,
} from 'sequelize-typescript';

@Table
export class Permission extends Model {
  @Index
  @Column({
    allowNull: false,
    unique: true,
  })
  alias: string;

  @Column
  title: string;

  @BelongsToMany(() => Role, () => RolePermission)
  roles: Role[];
}
