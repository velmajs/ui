import {default as Dialog, dialog} from './Dialog.svelte';

export default Object.assign(Dialog, {
    open: dialog
});