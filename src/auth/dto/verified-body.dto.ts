import { ApiProperty } from '@nestjs/swagger';

export class VerifiedBodyDto {
  @ApiProperty()
  verified_token: string;
}
