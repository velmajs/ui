<script lang="ts">
    import type {Snippet} from "svelte";

    let {
        children,
        top = 0,
        bottom,
        class: className
    }: { children: Snippet; top?: unknown; bottom?: unknown; class?: string } = $props();
</script>

<div class="ui-sticky {className}" style="{top ? `top: 0` : ''}{bottom ? `bottom: 0;` : ''}">
    {@render children()}
</div>


<style module>
    .ui-sticky {
        position: sticky;
    }
</style>