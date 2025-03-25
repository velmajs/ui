<script lang="ts">
    import {page} from '$app/state'
    import {Stack, Button, Icon} from "@velmajs/ui";
    import {Transitions} from "@velmajs/ui";

    let {entries = []}: { entries?: MenuItem[]; } = $props();

    const {send, receive} = Transitions;


    let active = (entry: MenuItem) => {
        return page.url.pathname === entry.href || (!entry.fullMatch && page.url.pathname.startsWith(entry.href));
    }
</script>

<div class="ui-menu" out:send|global="{{key: 'menu'}}" in:receive|global="{{key: 'menu'}}">
    <Stack>
        {#each entries as entry}
            <Button href="{entry.href}" class="{active(entry) ? 'active' : ''}">
                {#if entry.icon}
                    <Icon type={entry.icon} size={entry.iconSize ?? 1}/>
                {/if}
                {entry.name}
            </Button>
        {/each}
    </Stack>
</div>

<style module>
    .active {
        color: var(--primary-color);
    }
    .ui-menu {
        position: sticky;
        z-index: 50;
        top: 0;
        left: 0;
        max-width: 300px;
        min-width: 100px;
        height: 100%;
        background: var(--light);
        display: flex;
        flex-flow: column;
        align-items: center;
        padding: 1rem;
        white-space: nowrap;
        --orientation: column;
        box-shadow: .1rem .1rem 1rem hsl(from var(--shadow) h s calc(l * 3.8));

        @media (max-width: 600px) {
            position: absolute;
            top: unset;
            bottom: 0;
            height: 100px;
            transition-duration: 0s;
            width: 100vw;
            max-width: 100vw;
            --orientation: row;
        }
    }
</style>