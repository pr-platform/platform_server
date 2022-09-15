import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordBodyDto {
  @ApiProperty()
  reset_token: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
