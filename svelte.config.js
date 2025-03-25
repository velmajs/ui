import {vitePreprocess} from "@sveltejs/vite-plugin-svelte";
import {cssModules} from "svelte-preprocess-cssmodules";

/** @type {import('@sveltejs/kit').Config} */
export const svelteConfig = {
    preprocess: [vitePreprocess(), cssModules()]
};

export default svelteConfig;