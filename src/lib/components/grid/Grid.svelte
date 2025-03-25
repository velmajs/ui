<script lang="ts">
    import type {Snippet} from "svelte";

    let {
        columns,
        rows,
        gap = 0,
        padding = 0,
        children,
        class: className
    }: {
        children: Snippet;
        gap?: number;
        padding?: number;
        columns?: string;
        rows?: string;
        class?: string;
    } = $props();
</script>

<div class="ui-grid {className}">
    {@render children()}
</div>

<style module>
    .ui-grid {
        display: grid;

        gap: calc(var(--gap) * 1rem);
        padding: calc(var(--padding) * 1rem);

        --gap: bind(gap);
        --padding: bind(padding);
        --columns: bind(columns);
        --rows: bind(rows);
        grid-template-columns: var(--columns);
        grid-template-rows: var(--rows);
        overflow: hidden;

    }
</style>