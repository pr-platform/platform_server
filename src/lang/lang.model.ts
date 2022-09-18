import {
  Column,
  Model,
  Table,
  Index,
  IsAlphanumeric,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Translation } from './translation.model';

@Table
export class Lang extends Model {
  @ApiProperty({
    type: Number,
    description: 'Lang id',
    default: null,
  })
  declare id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Lang alias',
    default: null,
  })
  @Index
  @IsAlphanumeric
  @Column({
    allowNull: false,
    unique: true,
  })
  alias: string;

  @HasMany(() => Translation)
  translations: Translation[];
}
