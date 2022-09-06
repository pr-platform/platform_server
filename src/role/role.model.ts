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
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Role extends Model {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Role alias',
    default: null,
  })
  @Index
  @IsAlphanumeric
  @Column({
    allowNull: false,
    unique: true,
  })
  alias: string;

  @ApiProperty({
    type: String,
    description: 'Role name',
    default: '',
  })
  @Column
  title: string;

  @HasMany(() => User)
  users: User[];

  @ApiProperty({
    type: [Permission],
    description: 'Role permissions',
    default: [],
  })
  @BelongsToMany(() => Permission, () => RolePermission)
  permissions: Permission[];
}
