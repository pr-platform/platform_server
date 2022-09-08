import { Role } from './role.model';
import { RolePermission } from './role-permission.model';

import {
  Column,
  Model,
  Table,
  Index,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Permission extends Model {
  @ApiProperty({
    type: Number,
    description: 'Permission id',
    default: null,
  })
  declare id: number;

  @ApiProperty({
    type: String,
    description: 'Permission alias',
    required: true,
    default: '',
  })
  @Index
  @Column({
    allowNull: false,
    unique: true,
  })
  alias: string;

  @ApiProperty({
    type: String,
    description: 'Permission name',
    default: '',
  })
  @Column
  title: string;

  @BelongsToMany(() => Role, () => RolePermission)
  roles: Role[];
}
