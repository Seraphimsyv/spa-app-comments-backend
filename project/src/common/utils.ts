import {
  ALLOWED_FILES_TYPES,
  ALLOWED_TEXT_FILE_SIZE,
  IMAGE_MIME_TYPES,
} from './constant';
/**
 *
 * @param file
 * @returns
 */
export const validationFile = async (file: {
  mimetype: string;
  size: number;
}): Promise<boolean> => {
  if (!ALLOWED_FILES_TYPES.includes(file.mimetype)) {
    throw new Error('File not supported mimetype');
  }

  if (!IMAGE_MIME_TYPES.includes(file.mimetype)) {
    if (file.size > ALLOWED_TEXT_FILE_SIZE) {
      throw new Error('File size to big');
    }
  }

  return true;
};
/**
 *
 * @param fileData
 * @returns
 */
export const convertFileDataToFileObject = async (fileData: {
  filename: string;
  content: string;
}): Promise<Express.Multer.File> => {
  const { filename, content } = fileData;

  if (!content.includes('base64')) throw new Error('Not supported encode!');

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
