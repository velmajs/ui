<script lang="ts">

    import type {Snippet} from "svelte";

    let {children}: {
        children: Snippet;
    } = $props();
</script>

<div class="container">
    {@render children()}
</div>

<style>
    .container {
        max-width: 1200px;
        width: 100%;
        margin: 0 auto;
        padding: 1rem;
    }
</style>