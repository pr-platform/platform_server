import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Lang } from './lang.model';
import { Lexeme } from './lexeme.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table
export class Translation extends Model {
  @Field(type => Int)
  @ApiProperty({
    type: Number,
    description: 'Translation id',
    default: null,
  })
  declare id: number;

  @Field({ nullable: true, description: 'Translation text' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Translation text',
    default: null,
  })
  @Column
  translation: string;

  @Field(type => Int)
  @ApiProperty({
    type: Number,
    description: 'Translation lang id',
  })
  @ForeignKey(() => Lang)
  @Column
  langId: number;

  @Field(type => Lang)
  @ApiProperty({
    type: () => Lang,
    description: 'Translation lang',
  })
  @BelongsTo(() => Lang)
  lang: Lang;

  @Field(type => Int)
  @ApiProperty({
    type: Number,
    description: 'Translation lexeme id',
  })
  @ForeignKey(() => Lexeme)
  @Column
  lexemeId: number;

  @Field(type => Lexeme)
  @ApiProperty({
    type: Lexeme,
    description: 'Translation lexeme',
  })
  @BelongsTo(() => Lexeme)
  lexeme: Lexeme;
}
