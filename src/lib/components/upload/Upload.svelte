<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {uploadHandler} from "./utils.svelte";
    import Entry from "./Entry.svelte";
    import type {UploadProcessor} from "./types";
    import {createProcessor} from "./processor.svelte";

    let {
        icon,
        placeholder,
        processor = createProcessor({path: '/'}),
        accept,
        files = $bindable([]),
        children
    }: {
        icon?: () => any,
        placeholder?: () => any,
        processor?: UploadProcessor,
        accept: Record<string, string[]>,
        files: any[],
        children: () => any
    } = $props();

    let dropzone: HTMLElement;

    const handler = uploadHandler({accept, processor});
    handler.on('add', file => files = [...files, file]);
    handler.on('remove', file => files = files.filter(f => f !== file));


    onMount(() => handler.mount(dropzone,));
    onDestroy(() => handler.destroy());

    let acceptedExtensions = Object.values(accept).map(extensions => extensions.join(', ')).filter(e => !!e).join(', ');


</script>


<section class="svelte-upload" class:dragging={handler.dragging}>
    <div class="dropzone" bind:this={dropzone}>
        {#if icon}
            {@render icon()}
        {/if}

        {#if placeholder}
            {@render placeholder()}
        {:else}
            <p>
                Drop your audio files here, or <a>browse</a>
            </p>
            <p class="small">
                supports {acceptedExtensions}
            </p>
        {/if}
    </div>

    {#if files}
        <div class="entries">
            {#each files as file}
                <Entry {file}/>
            {/each}
        </div>
    {/if}

    {@render children()}
</section>

<style>
    :root {
        --svelte-upload-background: #fff;
        --svelte-upload-text-color: #6c6b6b;
        --svelte-upload-tint: #d3d3d3;
        --svelte-upload-shadow-color: rgba(0, 0, 0, .2);
        --svelte-upload-theme: rgb(44, 143, 246);
    }


    .svelte-upload {
        background: var(--svelte-upload-background);
        max-width: 80vw;
        max-height: 80vh;
        box-sizing: border-box;
        border-radius: 1rem;
        color: var(--svelte-upload-text-color);
        box-shadow: 0 0 2rem var(--svelte-upload-shadow-color);
        user-select: none;
        position: relative;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .dropzone {
            display: flex;
            flex-direction: column;

            padding: 3rem;
            align-items: center;
            justify-content: center;
            border: 2px dashed var(--svelte-upload-tint);
            border-radius: 1rem;

            p {
                font-weight: 700;
                font-size: .9rem;
                margin: 0;

                &.small {
                    font-weight: normal;
                }
            }

            a {
                color: var(--svelte-upload-theme);
                text-decoration: none;
            }

        }

        &.dragging .dropzone {
            border: 2px dashed var(--svelte-upload-theme);
            background: rgba(from var(--svelte-upload-theme) r g b / 0.1);
            border-radius: 1rem;
        }


        .entries {
            overflow-y: scroll;
        }
    }
</style>