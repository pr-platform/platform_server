import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateModuleInfoDto {
  @ApiProperty({
    description: 'Lang alias is unique',
    required: true,
    default: '',
  })
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly isInit: boolean;
}
