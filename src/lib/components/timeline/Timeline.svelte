<script lang="ts">
    let {data, start, detail} = $props();
</script>

<div class="timeline">
    {#each data as date}
        <div class="date">{date.date}</div>
        <div class="items">
            {#each date.items as item}
                <div class="item">
                    <div class="start">
                        {@render start(item)}
                    </div>
                    <div class="detail">
                        {@render detail(item)}
                    </div>
                </div>
            {/each}
        </div>
    {/each}

</div>


<style module>
    .timeline {
        display: flex;
        flex-direction: column;
        background: var(--light);
        color: hsl(from var(--contrast) h s l / 70%);
        position: relative;

        &:before {
            position: absolute;
            content: '';
            border-left: 1px solid hsl(from var(--contrast) h s l / 10%);
            left: 1.65rem;
            top: 0;
            bottom: 1rem;
            width: 1px;
        }

        .date {
            background: var(--light);
            padding: 1rem 0;
            z-index: 1;
        }

        .items {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding-bottom: 1rem;
        }

        .item {
            display: flex;
            flex-direction: row;
            gap: 1rem;

            .start {
                display: flex;
                justify-content: center;
                width: 56px;
            }
        }
    }

    .items:last-child {
        padding-bottom: 0;
    }
</style>