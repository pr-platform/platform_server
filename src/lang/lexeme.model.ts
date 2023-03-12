import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Translation } from './translation.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table
export class Lexeme extends Model {
  @Field((type) => Int)
  @ApiProperty({
    type: Number,
    description: 'Lexeme id',
    default: null,
  })
  declare id: number;

  @Field({ nullable: true, description: 'Lexeme text' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Lexeme',
    default: null,
  })
  @Column({
    allowNull: false,
    unique: true,
  })
  lexeme: string;

  @Field((type) => [Translation])
  @HasMany(() => Translation)
  translations: Translation[];
}
