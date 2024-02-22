/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
export declare const validationFile: (file: {
    mimetype: string;
    size: number;
}) => Promise<boolean>;
export declare const convertFileDataToFileObject: (fileData: {
    filename: string;
    content: string;
}) => Promise<Express.Multer.File>;
