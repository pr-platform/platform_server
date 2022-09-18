import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsAlphanumeric,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateTranslationDto {
  @ApiProperty({
    description: 'Translation',
    default: '',
  })
  @IsString()
  @IsAlphanumeric()
  readonly translation: string;

  @ApiProperty({
    description: 'Lang id',
    required: true,
    default: '',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly langId: number;

  @ApiProperty({
    description: 'Lexeme id',
    required: true,
    default: '',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly lexemeId: number;
}
