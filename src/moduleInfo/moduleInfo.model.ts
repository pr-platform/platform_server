import { Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Table
export class ModuleInfo extends Model {
  @Field((type) => Int)
  @ApiProperty({
    type: Number,
    description: 'Lexeme id',
    default: null,
  })
  declare id: number;

  @Field({ nullable: true, description: 'Setting key' })
  @ApiProperty({
    type: String,
    required: true,
    description: '',
    default: null,
  })
  @Column({
    allowNull: false,
    unique: true,
  })
  name: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: '',
    default: false,
  })
  @Column({})
  @Field((type) => Boolean)
  isInit: boolean;
}
