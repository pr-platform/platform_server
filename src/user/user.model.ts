import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Model,
  Table,
  Index,
  ForeignKey,
  BelongsTo,
  Length,
} from 'sequelize-typescript';
import { Role } from '../role/role.model';

@Table
export class User extends Model {
  @ApiProperty({
    type: String,
    description: 'User email',
    required: true,
    default: '',
  })
  @Index
  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User firstname',
    default: '',
  })
  @Column
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'User firstname',
    default: '',
  })
  @Column
  lastName: string;

  @ApiProperty({
    type: Boolean,
    description: 'User is active',
    default: true,
  })
  @Column({ defaultValue: true })
  isActive: boolean;

  @ApiProperty({
    type: String,
    description: 'User password',
    default: '',
    minimum: 6,
  })
  @Length({ min: 6 })
  @Column
  password: string;

  @ApiProperty({
    type: Number,
    description: 'User role id',
    default: 1,
  })
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @ApiProperty({
    type: Role,
    description: 'User role',
    default: null,
  })
  @BelongsTo(() => Role)
  role: Role;
}

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};
