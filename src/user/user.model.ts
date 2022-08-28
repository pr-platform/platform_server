import { Column, Model, Table, Index } from 'sequelize-typescript';

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

  @Column
  password: string;

  toJson() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }
}
