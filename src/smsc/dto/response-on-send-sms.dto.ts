import { ApiProperty } from '@nestjs/swagger';

export class ResponseOnSendSms {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cnt: number;
}
