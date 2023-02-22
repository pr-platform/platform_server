import { plainToInstance } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsString()
  ENABLE_CORS_ORIGINS: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsNumber()
  JWT_EXPIRED: number;

  @IsString()
  JWT_SECRET_KEY: string;

  @IsNumber()
  PASSWORD_SALT: number;

  @IsString()
  ADMIN_EMAIL: string;

  @IsString()
  ADMIN_PASSWORD: string;

  @IsString()
  EMAIL_ID: string;

  @IsString()
  EMAIL_PASSWORD: string;

  @IsString()
  TEST_EMAIL_FOR_GET_MAIL: string;

  @IsString()
  OAUTH_CLIENTID: string;

  @IsString()
  OAUTH_CLIENT_SECRET: string;

  @IsString()
  OAUTH_REFRESH_TOKEN: string;

  @IsString()
  SMSC_LOGIN: string;

  @IsString()
  SMSC_PASSWORD: string;

  @IsBoolean()
  SMSC_SSL: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
