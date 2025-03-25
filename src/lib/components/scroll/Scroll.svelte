<script lang="ts">
    import type {Snippet} from "svelte";

    let {children}: {
        children: Snippet;
    } = $props();
</script>

<div class="ui-scroll">
    {@render children()}
</div>


<style module>
    .ui-scroll {
        overflow-x: hidden;
        overflow-y: scroll;
        flex: 1;
        outline: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>