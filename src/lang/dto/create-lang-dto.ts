import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlphanumeric } from 'class-validator';

export class CreateLangDto {
  @ApiProperty({
    description: 'Lang alias is unique',
    required: true,
    default: '',
  })
  @IsString()
  @IsAlphanumeric()
  readonly alias: string;
}
