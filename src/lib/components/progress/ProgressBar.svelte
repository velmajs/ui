<script lang="ts">

    let {
        value = 0,
        max = 0
    }: {
        value: number;
        max: number;
    } = $props();

    let percentage = $derived(!value && !max ? 0 : value / max * 100);
</script>

<div class="ui-progress-bar">
    {value + ' / ' + max}
    <progress max="100" value={percentage}></progress>
    {percentage}%
</div>

<style>
    .ui-progress-bar {
        font-size: .7rem;
        display: flex;
        gap: .5rem;
        align-items: center;

        progress {
            height: .5rem;
            -webkit-appearance: none;
            appearance: none;
        }

        progress::-webkit-progress-bar {
            background-color: var(--light, #fff);
            border: 1px solid hsl(from var(--light-contrast) h s l / 25%);
            border-radius: 1rem;
            overflow: hidden;
        }

        progress::-webkit-progress-value {
            background: var(--primary-color);
            border-radius: 1rem;
        }

        progress::-moz-progress-bar {
            background-color: var(--primary-color);
            border-radius: 1rem;
        }
    }
</style>