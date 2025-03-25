<script lang="ts">
    import type {Snippet} from "svelte";
    import {Tappable} from "@velmajs/ui";


    let {
        variant = 'clear',
        alignment = 'center',
        size = 1,
        href,
        onclick,
        start,
        children,
        end,
        ...props
    }: {
        variant?: string;
        alignment?: 'start' | 'center' | 'end';
        size?: number;
        href?: string;
        onclick?: Function;
        start?: Snippet;
        children?: Snippet;
        end?: Snippet;
        class?: string;
    } = $props();

</script>

<Tappable {href} {onclick}>
    <button class={['ui-button', props.class]}
            data-clear={variant === 'clear'}
            style="--bg: var(--{variant}-color); --color: var(--{variant}-contrast); --size: {size};--alignment: {alignment}"
    >
        {@render start?.()}
        <div class="content">
            {@render children?.()}
            {@render end?.()}
        </div>
    </button>
</Tappable>

<style module>
    .ui-button {
        display: inline-flex;
        border-radius: var(--radius);
        font-weight: 200;
        padding: .5rem 1rem;
        cursor: pointer;

        transition-property: background;
        transition-duration: 200ms;

        font-size: calc(var(--size) * 1rem);

        background: transparent;
        border: none;
        gap:.5rem;

        &:not([data-clear="true"]) {
            background: hsl(from var(--bg) h s l);
            color: var(--color);
            border: 1px solid hsl(from var(--bg) h calc(s * 0.8) calc(l * .9));
            box-shadow: .1rem .1rem .5rem 0 rgb(from var(--shadow) r g b / .1);
        }

        @media (hover: hover) {
            &:hover {
                background: hsl(from var(--bg) h calc(s * 0.8) l);
            }
        }



        .content {
            flex: 1;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: var(--alignment);
            line-height: 1;
        }
    }
</style>