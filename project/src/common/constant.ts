import { config } from 'dotenv';

config();

export const NEST_CONSTANTS = {
  PORT: Number(process.env.NEST_PORT),
  HOST: process.env.NEST_HOST,
  UPLOAD_DIR: process.env.NEST_UPLOAD_DIR,
};

export const POSTGRES_CONSTANTS = {
  HOST: process.env.POSTGRES_HOST,
  PORT: Number(process.env.POSTGRES_PORT),
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  NAME: process.env.POSTGRES_NAME,
};

export const REDIS_CONSTANTS = {
  HOST: process.env.REDIS_HOST,
  PORT: Number(process.env.REDIS_PORT),
};

export const JWT_CONSTANTS = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};

export const MAX_IMAGE_SIZE_WIDTH: number = 320;
export const MAX_IMAGE_SIZE_HEIGHT: number = 240;

export const ALLOWED_TEXT_FILE_SIZE: number = 100 * 1024;

export const IMAGE_MIME_TYPES: string[] = [
  'image/jpeg',
  'image/png',
  'image/gif',
];

export const ALLOWED_FILES_TYPES: string[] = [
  ...IMAGE_MIME_TYPES,
  'text/plain',
];
