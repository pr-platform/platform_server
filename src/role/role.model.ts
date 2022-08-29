import { User } from '../user/user.model';
import {
  Column,
  Model,
  Table,
  Index,
  IsAlphanumeric,
  HasMany,
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
}
