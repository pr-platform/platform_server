import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { User } from '../../user/user.model';

export class RequestOnResetPasswordBodyDto {
  @ApiProperty()
  @IsEmail()
  email: Pick<User, 'email'>;
}
