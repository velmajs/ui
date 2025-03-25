export type FileInfo = {
    name: string;
    size: number;
    type: string;
    extension: string;
    process: number;
    remove: () => void;
}

export type UploadProcessor = {
    start(file: File, onProgress: (process: number) => void): void;
    abort(file: File): void;
}