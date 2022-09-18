import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlphanumeric } from 'class-validator';

export class CreateLexemeDto {
  @ApiProperty({
    description: 'Lexeme is unique',
    required: true,
    default: '',
  })
  @IsString()
  @IsAlphanumeric()
  readonly lexeme: string;
}
