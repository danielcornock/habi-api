import { config } from 'dotenv';

config({ path: 'config.env' });

export const devDatabaseUriString = process.env.DEV_DATABASE_URI;
export const port = process.env.PORT || 3000;
export const jwtSecret = process.env.JWT_SECRET;
export const environment = process.env.NODE_ENV;
export const isDevelopment = environment === 'dev';
export const isProduction = environment === 'production';
export const isLocal = environment === 'local';
