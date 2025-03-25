<script lang="ts">
    import type {Snippet} from "svelte";

    let {
        flow,
        flex = false,
        gap = 0,
        padding = 0,
        children,
        class: className
    }: {
        children: Snippet;
        gap?: number;
        padding?: number;
        flow?: 'horizontal' | 'vertical';
        flex?: boolean;
        class?: string;
    } = $props();
</script>

<div class="ui-stack {className}" data-flow={flow} data-flex={flex} style="--gap: {gap};--padding: {padding}">
    {@render children()}
</div>

<style module>
    .ui-stack {
        display: flex;
        flex-direction: var(--orientation);
        gap: calc(var(--gap) * 1rem);
        padding: calc(var(--padding) * 1rem);
        overflow: hidden;

        &[data-flow="vertical"] {
            --orientation: column;
        }

        &[data-flow="horizontal"] {
            --orientation: row;
            align-items: center;
        }

        &[data-flex="true"] {
            flex: 1;
            align-items: stretch;
            overflow: hidden;
        }
    }
</style>