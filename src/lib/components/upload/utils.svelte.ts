import type {FileInfo, UploadProcessor} from "./types";

export function uploadHandler(config: { accept: Record<string, string[]>, processor: UploadProcessor }) {
    let listeners: (() => void)[] = [];
    let dragging = $state(false);

    let handlers: Record<string, ((info: FileInfo) => void)[]> = {};

    return {
        get dragging() {
            return dragging;
        },
        on: (event: string, handler: (info: FileInfo) => void) => {
            if (event === 'add') {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            }
            if (event === 'remove') {
                handlers[event] = handlers[event] || [];
                handlers[event].push(handler);
            }
        },
        mount: (dropzone: HTMLElement) => {
            let input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = Object.keys(config.accept).join(', ');


            listeners.push(createListener(dropzone, 'click', () => input.click()));

            listeners.push(createListener(dropzone, ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'], (e) => {
                e.preventDefault();
                e.stopPropagation();
            }));

            listeners.push(createListener(dropzone, 'dragover', () => dragging = true));
            listeners.push(createListener(dropzone, 'dragleave', () => dragging = false));
            listeners.push(createListener(dropzone, 'drop', (e: DragEvent) => {
                dragging = false;
                if (!e.dataTransfer?.files) return;
                Array.from(e.dataTransfer.files).forEach(file => {
                    const info = upload(file, config, () => {
                        handlers.remove?.forEach(handler => handler(info));
                    });
                    handlers.add?.forEach(handler => handler(info));
                });
            }));

            listeners.push(createListener(input, 'change', () => {
                if (!input.files) return;
                Array.from(input.files).forEach(file => {
                    const info = upload(file, config, () => {
                        handlers.remove?.forEach(handler => handler(info));
                    });
                    handlers.add?.forEach(handler => handler(info));
                });
                input.value = '';
            }));
        },
        destroy: () => {
            listeners.forEach(listener => listener())
        }
    }
}

export function createListener<T extends Event>(target: HTMLElement, event: (keyof HTMLElementEventMap) | (keyof HTMLElementEventMap)[], handler: (e: T) => void) {
    event = Array.isArray(event) ? event : [event];
    event.forEach(event => target.addEventListener(event, handler as EventListener));
    return () => {
        event.forEach(event => target.removeEventListener(event, handler as EventListener));
    }
}

function upload(file: File, config: {
    accept: Record<string, string[]>,
    processor: UploadProcessor
}, abort?: () => void): FileInfo {
    const info = $state({
        name: file.name,
        size: file.size,
        type: file.type,
        extension: file.name.split('.').pop() || '',
        process: 0,
        remove: async () => {
            config.processor.abort(file);
            abort?.();
        }
    });
    config.processor.start(file, (process: number) => {
        info.process = process;
    });
    return info;
}