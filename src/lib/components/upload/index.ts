import Upload from './Upload.svelte'
import * as MimeType from './mimetypes'
import * as Types from './types'
import {createProcessor} from './processor.svelte'

export default Object.assign(Upload, {
    mime: MimeType,
    types: Types,
    createProcessor
});