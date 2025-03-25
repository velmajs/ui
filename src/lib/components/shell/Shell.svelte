<script lang="ts">
    import type {Snippet} from "svelte";

    let {children}: { children: Snippet; } = $props();
</script>

<div class="ui-shell">
    {@render children()}
</div>


<style>
    .ui-shell {
        height: 100%;
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        flex-flow: column;
    }
</style>