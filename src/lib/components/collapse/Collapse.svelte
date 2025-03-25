<script lang="ts">
    import type {Snippet} from "svelte";
    import {Icon, Stack, Tappable, Transitions} from "@velmajs/ui";

    let {children, detail}: { children: Snippet; detail: Snippet; } = $props();
    let {expand} = Transitions;

    let expanded = $state(false);
</script>

<Stack.item class="ui-collapse">
    <Tappable onclick={()=>expanded=!expanded}>
        <Stack class="ui-collapse-header" flow="horizontal">
            <Icon type={expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}/>
            <Stack.item flex>{@render children()}</Stack.item>
        </Stack>
    </Tappable>
    {#if expanded}
        <div transition:expand={{ duration: 200}}>
            <div class="ui-collapse-detail">
                {@render detail()}
            </div>
        </div>
    {/if}
</Stack.item>


<style module>
    .ui-collapse {
        border: 1px solid hsl(from var(--shadow) h s calc(l * 3.7));
        box-shadow: .1rem .1rem 1rem hsl(from var(--shadow) h s calc(l * 4)),
        0 1px 2px -1px hsl(from var(--shadow) h s calc(l * 4));
        user-select: none;
    }

    .ui-collapse-header {
        padding: .5rem;
        background: hsl(from var(--background) h s calc(l * 1.02));
        cursor: pointer;
        border: none;
        border-bottom: 1px solid hsl(from var(--shadow) h s calc(l * 4));
        user-select: text;
    }

    .ui-collapse-detail {
        padding: 1rem;
        overflow: hidden;
        min-height: 0;
        user-select: text;
    }
</style>