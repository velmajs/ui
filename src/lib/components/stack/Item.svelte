<script lang="ts">
    import type {Snippet} from "svelte";

    let {
        children,
        class: className,
        flex = false
    }: { children: Snippet; class?: string; flex?: boolean } = $props();
</script>

<div class="ui-stack-item {className}" data-flex={flex}>
    {@render children()}
</div>


<style module>
    .ui-stack-item {
        &[data-flex="true"] {
            flex: 1;
        }
    }
</style>