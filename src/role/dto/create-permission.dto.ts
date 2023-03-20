import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  readonly alias: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly lexeme: string;
}
