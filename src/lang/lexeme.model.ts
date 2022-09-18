import {
  Column,
  Model,
  Table,
  IsAlphanumeric,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Translation } from './translation.model';

@Table
export class Lexeme extends Model {
  @ApiProperty({
    type: Number,
    description: 'Role id',
    default: null,
  })
  declare id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Role alias',
    default: null,
  })
  @IsAlphanumeric
  @Column({
    allowNull: false,
    unique: true,
  })
  lexeme: string;

  @HasMany(() => Translation)
  translations: Translation[];
}
