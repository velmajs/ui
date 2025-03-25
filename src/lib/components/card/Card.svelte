<script lang="ts">
    import type {Snippet} from "svelte";

    let {
        start,
        children,
        end,
        aspectRatio,
        class: className,
        style
    }: {
        start?: Snippet;
        children?: Snippet;
        end?: Snippet;
        aspectRatio?: string;
        class?: string;
        style?: string;
    } = $props();
</script>

<div class="ui-card {className}" style="{style}">
    {@render start?.()}
    {#if children}
        <div class="ui-card-body">
            {@render children?.()}
        </div>
    {/if}
    {@render end?.()}
</div>

<style module>
    .ui-card {
        position: relative;
        display: inline-flex;
        background: var(--light);
        color: var(--light-contrast);
        overflow: hidden;
        flex-flow: column;

        border-radius: calc(var(--radius) * 2);
        border: 1px solid hsl(from var(--shadow) h s calc(l * 3.8));
        box-shadow: .1rem .1rem 1rem hsl(from var(--shadow) h s calc(l * 3.8)),
        0 1px 2px -1px hsl(from var(--shadow) h s calc(l * 4));
        aspect-ratio: bind(aspectRatio);

        .ui-card-body {
            padding: 1rem;
            flex: 1;
            display: flex;
            flex-flow: column;
            z-index: 1;
            overflow: hidden;
        }
    }
</style>