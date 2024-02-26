import { FileCreatedEvent, FileResizedEvent, FileUploadedEvent } from '../events/file.event';
export declare class FileListener {
    private readonly logger;
    handleFileCreated(event: FileCreatedEvent): Promise<void>;
    handleFileResized(event: FileResizedEvent): Promise<void>;
    handleFileUploaded(event: FileUploadedEvent): Promise<void>;
}
