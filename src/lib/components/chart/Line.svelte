<script lang="ts">
    import {Chart} from 'chart.js';
    import 'chart.js/auto';

    const {
        data = [],
        class: className,
        color = 'dark'
    }: {
        data: number[];
        class?: string;
        color?: string;
    } = $props();


    let chart: Chart;
    let canvasElm: HTMLCanvasElement | null = null;
    let computedColor = $derived(canvasElm ? getComputedStyle(canvasElm).getPropertyValue(`--${color}-color`) : '#000');


    $effect(() => {
        if (!canvasElm) return;
        chart = new Chart(canvasElm, {
            type: 'line',
            data: {
                labels: Array(data.length).fill(''),
                datasets: [{
                    pointRadius: 0,
                    borderWidth: 1.5,
                    borderColor: computedColor,
                    data
                }]
            },
            options: {
                // responsive:false,
                // aspectRatio: 0,
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: false
                    },
                    x: {
                        display: false
                    }
                }
            }
        })
        return () => {
            chart.destroy();
        };
    });

</script>

<div class="{className}">
    <canvas bind:this={canvasElm}></canvas>
</div>
<style>
    canvas {
        width: 100%;
        height: 100%;
        margin: 1px;
    }
</style>