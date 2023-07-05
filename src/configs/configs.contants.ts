import { config } from 'dotenv';
config();

export const appConfig = {
  port: process.env.APP_PORT,
  apiPrefix: process.env.API_PREFIX,
};

export const databaseConfig = {
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  synchronize: process.env.DB_SYNCHRONIZE,
  autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES,
};

export const authenGoogleConfig = {
  client_id: process.env.CLIENT_ID,
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
  refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  expiresInSeconds: parseInt(process.env.JWT_EXPIRES_IN_SECONDS)
}