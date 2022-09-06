import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDataDto {
  @ApiProperty({
    type: String,
    description: 'User email',
    required: true,
    default: 'test@test.test',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    required: true,
    default: 'password',
  })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
