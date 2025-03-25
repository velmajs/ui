<script lang="ts">
    import prettyBytes from 'pretty-bytes';
    import type {FileInfo} from "./types";

    let {file, closeButton, progressBar}: {
        file: FileInfo,
        closeButton?: (file: any) => any,
        progressBar?: (file: any) => any
    } = $props();
</script>

<section class="entry">
    <div class="row">
        <div class="col">
            <div class="filename">
                {file.name}
            </div>
            <div class="info">
                {file.extension} -
                {prettyBytes(file.size)} -
                {file.process}%
            </div>
        </div>

        {#if closeButton}
            {@render closeButton(file)}
        {:else}
            <button onclick={file.remove}>
                X
            </button>
        {/if}
    </div>

    {#if progressBar}
        {@render progressBar(file)}
    {:else}
        <progress value={file.process} max="100"/>
    {/if}
</section>

<style>
    .entry {
        margin: .5rem 0;
        border-radius: 1rem;
        padding: 1rem;
        background: var(--svelte-upload-entry-background);
        border: 1px solid var(--svelte-upload-tint);

        .row {
            display: flex;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;

            .col {
                display: flex;
                gap: .5rem;
                flex-direction: column;
                overflow: hidden;

                .filename {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .info {
                    font-size: .8rem;
                }
            }
        }

        progress {
            flex: 1;
            width: 100%;
            height: .3rem;
            -webkit-appearance: none;
            appearance: none;
        }

        progress::-webkit-progress-bar {
            background-color: var(--svelte-upload-tint);
            border-radius: 1rem;
            overflow: hidden;
        }

        progress::-webkit-progress-value {
            background: var(--svelte-upload-theme);
        }

        progress::-moz-progress-bar {
            background: var(--svelte-upload-theme);
        }

        button {
            all: unset;
            cursor: pointer;
            display: flex;
            gap: .5rem;
            align-items: center;
            justify-content: center;
            border-radius: 2rem;
            padding: .5rem;
            border: 1px solid var(--svelte-upload-tint);
            width: 20px;
            height: 20px;
        }

    }
</style>