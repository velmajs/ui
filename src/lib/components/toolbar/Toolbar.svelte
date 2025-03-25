<script lang="ts">
    import type {Snippet} from "svelte";
    import {Stack} from "@velmajs/ui";

    let {children}: { children: Snippet } = $props();

</script>

<Stack flow="horizontal" class="ui-toolbar">
    {@render children()}
</Stack>


<style module>
    .ui-toolbar {
        width: 100%;
        background: var(--light);

        border-bottom: 1px solid hsl(from var(--shadow) h s calc(l * 3.8));
        box-shadow: .1rem .1rem 1rem hsl(from var(--shadow) h s calc(l * 3.8));

        justify-content: space-between;
        padding: 1rem;
        gap: 1rem;
        z-index: 1000;
    }
</style>