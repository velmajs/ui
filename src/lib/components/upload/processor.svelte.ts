export function createProcessor(options: { path: string }) {
    let instances = new Map<File, XMLHttpRequest>();
    return {
        start: (file: File, onProgress: (process: number) => void) => {
            const xhr = new XMLHttpRequest();
            instances.set(file, xhr);

            xhr.open('POST', options.path, true);
            xhr.upload.onprogress = (e) => {
                onProgress(Math.round(e.loaded / e.total) * 100);
            }
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log('Upload complete');
                    onProgress(100);
                } else {
                    console.error('Upload failed');
                }
            };
            xhr.onerror = () => {
                console.error('Upload failed');
            };

            const formData = new FormData();
            formData.append('file', file);
            xhr.send(formData);
        },
        abort: (file: File) => {
            const xhr = instances.get(file);
            if (xhr) {
                xhr.abort();
                instances.delete(file);
            }
        }
    }

}