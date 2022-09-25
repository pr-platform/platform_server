import { ApiProperty } from '@nestjs/swagger';

export default class SendSmsBodyDto {
  @ApiProperty()
  phones: string[];

  @ApiProperty()
  message: string;
}
