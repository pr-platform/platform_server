import { ApiProperty } from '@nestjs/swagger';

export class SmscResponseOnSendSms {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cnt: number;
}
