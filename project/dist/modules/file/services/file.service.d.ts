/// <reference types="multer" />
import { OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class FileService implements OnModuleInit {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    private readonly logger;
    onModuleInit(): Promise<void>;
    checkImageResolution(file: Express.Multer.File): Promise<boolean>;
    resizeImage(file: Express.Multer.File): Promise<Express.Multer.File>;
    saveFile(fileData: Express.Multer.File): Promise<Express.Multer.File>;
}
