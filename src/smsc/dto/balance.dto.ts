import { ApiProperty } from '@nestjs/swagger';

export default class SmscBalanceDto {
  @ApiProperty()
  balance: string;
}
