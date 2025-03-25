<script lang="ts">
    import {Chart} from 'chart.js';
    import 'chart.js/auto';

    const {
        color = false,
        max = 0,
        value = 0,
        size = 1
    }: {
        color?: string | false;
        max?: number;
        value?: number;
        size?: number;
    } = $props();


    let canvasElm: HTMLCanvasElement | null = null;
    let computedColor = $derived(canvasElm ? getComputedStyle(canvasElm).getPropertyValue('--primary-color') : '#000');
    let fill = $derived(color !== false ? color : computedColor);

    const remaining = $derived(max - value);
    const data = $derived({
        datasets: [{
            data: Array(max).fill(1),
            backgroundColor: [
                ...Array(value).fill(fill),
                ...(remaining > 0 ? Array(remaining).fill(fill + '20') : [])
            ],
            borderWidth: 0,
        }]
    });


    let chart: Chart;
    $effect(() => {
        if (!canvasElm) return;
        chart = new Chart(canvasElm, {
            type: 'doughnut',
            data,
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                spacing: size / 2,
                animation: false,
                cutout: '60%',
                responsive: true,
            }
        })
        return () => {
            chart.destroy();
        };
    });
    $effect(() => {
        if (chart) {
            chart.data = data;
            chart.update();
        }
    });

</script>


<canvas bind:this={canvasElm} style="--ratio: {size}rem"></canvas>

<style>
    canvas {
        aspect-ratio: 1;
        margin: 1px;
        width: var(--ratio, 100%);
    }
</style>