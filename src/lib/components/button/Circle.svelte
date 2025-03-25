<script lang="ts">
    import Button from "./Default.svelte";

    let {...props} = $props();

</script>

<Button class="circle" {...props}/>

<style module>
    .circle {
        aspect-ratio: 1;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>