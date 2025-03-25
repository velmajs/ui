<script lang="ts">
    import type {Snippet} from "svelte";
    import {tappable} from "./tappable";

    let {href, onclick, children}: {
        href?: string;
        onclick?: Function;
        children: Snippet;
    } = $props();
</script>

<div use:tappable={{href,onclick}} class="tappable">
    {@render children()}
</div>

<style module>
    .tappable {
        display: contents;
        cursor: pointer;
    }
</style>