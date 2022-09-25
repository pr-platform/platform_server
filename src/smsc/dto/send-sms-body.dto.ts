import { ApiProperty } from '@nestjs/swagger';

export default class SmscSendSmsBodyDto {
  @ApiProperty()
  phones: string[];

  @ApiProperty()
  message: string;
}
