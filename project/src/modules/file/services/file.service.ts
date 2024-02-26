import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as sizeOf from 'image-size';
import * as mimeTypes from 'mime-types';
import * as jimp from 'jimp';
import { extname } from 'path';
import {
  IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE_HEIGHT,
  MAX_IMAGE_SIZE_WIDTH,
  NEST_CONSTANTS,
} from 'src/common/constant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  FileCreatedEvent,
  FileResizedEvent,
  FileUploadedEvent,
} from '../events/file.event';
import { File } from '../entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFileCreateData } from '../interfaces/file.interfaces';

@Injectable()
export class FileService implements OnModuleInit {
  constructor(
    @InjectRepository(File)
    private readonly repository: Repository<File>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private readonly logger: Logger = new Logger(FileService.name);
  /**
   *
   */
  async onModuleInit() {
    const foldersToCheck = [
      NEST_CONSTANTS.UPLOAD_DIR,
      `${NEST_CONSTANTS.UPLOAD_DIR}/images`,
      `${NEST_CONSTANTS.UPLOAD_DIR}/text`,
    ];

    for (const folderPath of foldersToCheck) {
      try {
        await fs.promises.access(folderPath, fs.constants.F_OK);
      } catch (err) {
        await fs.promises.mkdir(folderPath);
      }
    }
  }
  /**
   *
   * @param createData
   * @returns
   */
  async createOne(createData: IFileCreateData): Promise<File> {
    const newFile = await this.repository.create(createData);
    const savedFile = await this.repository.save(newFile);

    const createdFileEvent = new FileCreatedEvent();
    createdFileEvent.id = savedFile.id;
    createdFileEvent.filename = savedFile.filename;
    this.eventEmitter.emit('file.created', createdFileEvent);

    return savedFile;
  }
  /**
   * Check image resolution
   * @param file
   * @returns boolean
   */
  private async checkImageResolution(
    file: Express.Multer.File,
  ): Promise<boolean> {
    try {
      const fileResolution = sizeOf.imageSize(file.buffer);

      if (
        fileResolution.height > MAX_IMAGE_SIZE_HEIGHT ||
        fileResolution.width > MAX_IMAGE_SIZE_WIDTH
      ) {
        return false;
      }

      return true;
    } catch (err) {
      this.logger.error(`Check resolution error: ${err.message}`);

      throw new Error(err);
    }
  }
  /**
   * Resize image size
   * @param file
   * @returns file
   */
  async resizeImage(file: Express.Multer.File): Promise<Express.Multer.File> {
    try {
      const resizeImage = await jimp.read(file.buffer);
      await resizeImage
        .resize(MAX_IMAGE_SIZE_WIDTH, MAX_IMAGE_SIZE_HEIGHT)
        .quality(100)
        .getBufferAsync(jimp.MIME_JPEG);

      file.buffer = await resizeImage.getBufferAsync(jimp.MIME_JPEG);

      return file;
    } catch (err) {
      this.logger.error(`Resise image error: ${err.message}`);

      throw new Error(err);
    }
  }
  /**
   * Save file
   * @param file
   * @returns void
   */
  async saveFile(fileData: Express.Multer.File) {
    let file = fileData as Express.Multer.File;

    if (file.buffer instanceof Buffer === false)
      file.buffer = Buffer.from(file.buffer);

    let destination: string;
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    const preOriginalName = file.originalname;
    file.originalname = uniqueSuffix + extname(file.originalname);

    const fileMimeType = file.mimetype
      ? file.mimetype
      : mimeTypes.lookup(file.originalname);

    if (IMAGE_MIME_TYPES.includes(fileMimeType)) {
      destination = 'images';
      const validResolution = await this.checkImageResolution(file);

      if (!validResolution) {
        file = await this.resizeImage(file);

        const fileResizedEvent = new FileResizedEvent();
        fileResizedEvent.filename = preOriginalName;
        this.eventEmitter.emit('file.resized', fileResizedEvent);
      }
    } else {
      destination = 'text';
    }

    try {
      await fs.promises.writeFile(
        `${NEST_CONSTANTS.UPLOAD_DIR}/${destination}/${file.originalname}`,
        file.buffer,
      );

      /** Create file upload event */
      const fileUploadedEvent = new FileUploadedEvent();
      fileUploadedEvent.filePath = `${NEST_CONSTANTS.UPLOAD_DIR}/${destination}/${file.originalname}`;
      fileUploadedEvent.size = file.size;
      this.eventEmitter.emit('file.uploaded', fileUploadedEvent);

      const createdFile = await this.createOne({
        filename: preOriginalName,
        filepath: `${NEST_CONSTANTS.UPLOAD_DIR}/${destination}/${file.originalname}`,
      });

      return { ...createdFile };
    } catch (err) {
      this.logger.error(`Failed fs write file: ${err.message}`);

      throw new Error(err);
    }
  }
}
