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
  @Index
  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Length({ min: 6 })
  @Column
  password: string;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};
