import {audioTypes} from "./audio";
import {imageTypes} from "./image";

export function getExtension(fileType?: string, type: 'audio' | 'image' = 'audio') {
    const types = type === 'audio' ? audioTypes : imageTypes;
    return Object.entries(types).find(([key, value]) => key === fileType)?.[1][0];
}

export function getMimeType(extension: string) {
    return Object.keys(audioTypes).find((key) => audioTypes[key].includes(extension)) || Object.keys(imageTypes).find((key) => imageTypes[key].includes(extension));
}



export {audioTypes, imageTypes};