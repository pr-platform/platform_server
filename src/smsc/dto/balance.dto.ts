import { ApiProperty } from '@nestjs/swagger';

export default class BalanceDto {
  @ApiProperty()
  balance: string;
}
