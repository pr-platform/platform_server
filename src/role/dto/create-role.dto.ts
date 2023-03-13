import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsAlphanumeric } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role alias is unique',
    required: true,
    default: '',
  })
  @IsString()
  @IsAlphanumeric()
  readonly alias: string;

  @ApiProperty({
    description: 'Role name',
    default: '',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Lexeme',
    default: '',
  })
  @IsString()
  readonly lexeme: string;
}
