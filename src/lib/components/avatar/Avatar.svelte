<script lang="ts">
    const {
        class: className = '',
        size = '2.5rem'
    }: {
        class?: string;
        size?: string;
    } = $props();
</script>


<div class="ui-avatar {className}" style="background-image: url('https://i.pravatar.cc/150?img=12'); --size: {size}"></div>

<style>
    .ui-avatar {
        width: var(--size, 2.5rem);
        height: var(--size, 2.5rem);
        background-color: #fff;
        border-radius: 50%;
        position: relative;
        background-size: cover;
        border: 2px solid #d8d8d8;
        box-shadow: inset 0 0 1rem rgba(0, 0, 0, .3),
        .2rem .2rem 1rem rgba(0, 0, 0, .2);
        flex: none;
    }
</style>