<script lang="ts">
    import type {FileInfo} from "./types";

    let {name, files, children}: {
        name: string;
        files: FileInfo[];
        children: () => any;
    } = $props();


    function remove() {
        files.forEach(file => file.remove());
    }
</script>

<section class="entry">
    {#if files.length > 1}
        <div class="row">
            <div class="col">
                <h1>{name}</h1>
            </div>

            <button onclick={remove}>
                X
            </button>
        </div>
    {/if}
    <div class="entries">
        {@render children?.()}
    </div>
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
            }
        }

        .entries {

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