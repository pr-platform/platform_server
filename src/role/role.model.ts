import { User } from '../user/user.model';
import { Permission } from './permission.model';
import { RolePermission } from './role-permission.model';
import {
  Column,
  Model,
  Table,
  Index,
  IsAlphanumeric,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';

@Table
export class Role extends Model {
  @Index
  @IsAlphanumeric
  @Column({
    allowNull: false,
    unique: true,
  })
  alias: string;

  @Column
  title: string;

  @HasMany(() => User)
  users: User[];

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions: Permission[];
}