import { Role } from './role.model';
import { RolePermission } from './role-permission.model';

import {
  Column,
  Model,
  Table,
  Index,
  IsAlphanumeric,
  BelongsToMany,
} from 'sequelize-typescript';

@Table
export class Permission extends Model {
  @Index
  @IsAlphanumeric
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
