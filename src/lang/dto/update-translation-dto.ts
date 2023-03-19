import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTranslationDto {
  @ApiProperty({
    description: 'Translation',
    default: '',
  })
  @IsString()
  readonly translation: string;
}
