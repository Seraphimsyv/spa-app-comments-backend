/// <reference types="multer" />
import Bull, { Queue } from 'bull';
export declare class FileQueueService {
    private readonly fileQueue;
    constructor(fileQueue: Queue);
    private readonly logger;
    addSaveFileJob(file: Express.Multer.File): Promise<Bull.Job<any>>;
}
