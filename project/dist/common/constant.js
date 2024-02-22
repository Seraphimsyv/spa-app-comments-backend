"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_FILES_TYPES = exports.IMAGE_MIME_TYPES = exports.ALLOWED_TEXT_FILE_SIZE = exports.MAX_IMAGE_SIZE_HEIGHT = exports.MAX_IMAGE_SIZE_WIDTH = exports.JWT_CONSTANTS = exports.REDIS_CONSTANTS = exports.POSTGRES_CONSTANTS = exports.NEST_CONSTANTS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.NEST_CONSTANTS = {
    PORT: Number(process.env.NEST_PORT),
    HOST: process.env.NEST_HOST,
    UPLOAD_DIR: process.env.NEST_UPLOAD_DIR,
};
exports.POSTGRES_CONSTANTS = {
    HOST: process.env.POSTGRES_HOST,
    PORT: Number(process.env.POSTGRES_PORT),
    USER: process.env.POSTGRES_USER,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    NAME: process.env.POSTGRES_NAME,
};
exports.REDIS_CONSTANTS = {
    HOST: process.env.REDIS_HOST,
    PORT: Number(process.env.REDIS_PORT),
};
exports.JWT_CONSTANTS = {
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
};
exports.MAX_IMAGE_SIZE_WIDTH = 320;
exports.MAX_IMAGE_SIZE_HEIGHT = 240;
exports.ALLOWED_TEXT_FILE_SIZE = 100 * 1024;
exports.IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
];
exports.ALLOWED_FILES_TYPES = [
    ...exports.IMAGE_MIME_TYPES,
    'text/plain',
];
//# sourceMappingURL=constant.js.map