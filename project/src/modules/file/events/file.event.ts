export class FileCreatedEvent {
  id: number;
  filename: string;
}

export class FileResizedEvent {
  filename: string;
}

export class FileUploadedEvent {
  filePath: string;
  size: number;
}
