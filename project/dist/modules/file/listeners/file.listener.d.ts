import { FileUploadedEvent } from '../events/file.event';
export declare class FileListener {
    private readonly logger;
    handleFileUploaded(event: FileUploadedEvent): Promise<void>;
}
