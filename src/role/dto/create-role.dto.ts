import { IsString, IsAlphanumeric } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsAlphanumeric()
  readonly alias: string;

  @IsString()
  readonly title: string;
}
