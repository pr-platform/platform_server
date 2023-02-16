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
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table
export class Lang extends Model {
  @Field(type => Int)
  @ApiProperty({
    type: Number,
    description: 'Lang id',
    default: null,
  })
  declare id: number;

  @Field({ nullable: true, description: 'Lang alias' })
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

  @Field(type => [Translation])
  @HasMany(() => Translation)
  translations: Translation[];
}
