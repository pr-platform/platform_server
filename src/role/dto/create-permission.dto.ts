import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  readonly alias: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly lexeme: string;
}
