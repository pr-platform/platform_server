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

@Table
export class Translation extends Model {
  @ApiProperty({
    type: Number,
    description: 'Translation id',
    default: null,
  })
  declare id: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Translation text',
    default: null,
  })
  @Column
  translation: string;

  @ApiProperty({
    type: Number,
    description: 'Translation lang id',
  })
  @ForeignKey(() => Lang)
  @Column
  langId: number;

  @BelongsTo(() => Lang)
  lang: Lang;

  @ApiProperty({
    type: Number,
    description: 'Translation lexeme id',
  })
  @ForeignKey(() => Lexeme)
  @Column
  lexemeId: number;

  @BelongsTo(() => Lexeme)
  lexeme: Lexeme;
}
