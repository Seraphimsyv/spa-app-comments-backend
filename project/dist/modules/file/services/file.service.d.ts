/// <reference types="multer" />
import { OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { File } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { IFileCreateData } from '../interfaces/file.interfaces';
export declare class FileService implements OnModuleInit {
    private readonly repository;
    private readonly eventEmitter;
    constructor(repository: Repository<File>, eventEmitter: EventEmitter2);
    private readonly logger;
    onModuleInit(): Promise<void>;
    createOne(createData: IFileCreateData): Promise<File>;
    private checkImageResolution;
    resizeImage(file: Express.Multer.File): Promise<Express.Multer.File>;
    saveFile(fileData: Express.Multer.File): Promise<{
        id: number;
        filename: string;
        filepath: string;
        uploadAt: Date;
    }>;
}
