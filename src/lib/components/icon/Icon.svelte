<script lang="ts">
    import '@fontsource-variable/material-symbols-rounded/full.css';

    let {
        type,
        class: className,
        fill,
        size
    }: {
        type: string;
        class?: string;
        fill?: boolean;
        size?: number;
    } = $props();
</script>

<div class="ui-icon material-symbols {className}" class:fill style="--size: {size}">{type}</div>

<style module>
    .material-symbols {
        font-family: "Material Symbols Rounded Variable";
        font-weight: normal;
        font-style: normal;
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
        font-size: calc(var(--size, 1) * 1rem);

        &.fill {
            font-variation-settings: 'FILL' 1;
        }
    }
</style>