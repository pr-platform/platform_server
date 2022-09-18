import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTranslationDto {
  @ApiProperty({
    description: 'Translation',
    default: '',
  })
  @IsString()
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
