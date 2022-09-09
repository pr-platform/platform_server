import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User email',
    required: true,
    default: '',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    required: true,
    default: '',
  })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    type: Number,
    description: 'User role id',
    default: 1,
  })
  roleId?: number;

  @ApiProperty({
    type: Boolean,
    description: 'Is user verified by email',
    default: false,
  })
  verified?: boolean;
}
