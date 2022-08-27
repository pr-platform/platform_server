import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  jwtExpered: parseInt(process.env.JWT_EXPIRED, 10),
  jwtSecreteKey: process.env.JWT_SECRETE_KEY,
}));
