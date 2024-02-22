"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFileDataToFileObject = exports.validationFile = void 0;
const constant_1 = require("./constant");
const validationFile = async (file) => {
    if (!constant_1.ALLOWED_FILES_TYPES.includes(file.mimetype)) {
        throw new Error('File not supported mimetype');
    }
    if (!constant_1.IMAGE_MIME_TYPES.includes(file.mimetype)) {
        if (file.size > constant_1.ALLOWED_TEXT_FILE_SIZE) {
            throw new Error('File size to big');
        }
    }
    return true;
};
exports.validationFile = validationFile;
const convertFileDataToFileObject = async (fileData) => {
    const { filename, content } = fileData;
    if (!content.includes('base64'))
        throw new Error('Not supported encode!');
    const fileMimeType = content.split(';base64').shift().split(':').pop();
    const fileContent = content.split(';base64').pop();
    const decodedFileContent = Buffer.from(fileContent, 'base64');
    return {
        fieldname: 'file',
        originalname: filename,
        mimetype: fileMimeType,
        encoding: '',
        buffer: decodedFileContent,
        size: decodedFileContent.byteLength,
        stream: undefined,
        destination: undefined,
        filename: undefined,
        path: undefined,
    };
};
exports.convertFileDataToFileObject = convertFileDataToFileObject;
//# sourceMappingURL=utils.js.map