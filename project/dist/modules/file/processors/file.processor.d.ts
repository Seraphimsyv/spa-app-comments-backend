import { Job } from 'bull';
import { FileService } from '../services/file.service';
export declare class FileProcessor {
    private readonly fileService;
    constructor(fileService: FileService);
    private readonly logger;
    saveFile(job: Job): Promise<{
        filePath: string;
    }>;
    onActive(job: Job): void;
    onCompletedSave(job: Job): void;
    onError(job: Job): void;
    onFailed(job: Job): void;
}
