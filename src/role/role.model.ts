import {
  Column,
  Model,
  Table,
  Index,
  IsAlphanumeric,
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
}
