<script lang="ts" module>
    import {goto, preloadData, pushState} from "$app/navigation";
    import {page} from "$app/state";
    import type {Component} from "svelte";

    let DialogComponent: Component | undefined = $state();

    export async function dialog(comp: Component, href: string) {
        const result = await preloadData(href);
        DialogComponent = comp;
        if (result.type === 'loaded' && result.status === 200) {
            pushState(href, {selected: result.data});
        } else {
            goto(href);
        }
    }
</script>

<script lang="ts">
    import {fade, fly} from 'svelte/transition';
    import {Icon, Tappable} from "@velmajs/ui";

    let dialog: HTMLDialogElement | undefined = $state();
    $effect(() => {
        if (dialog) {
            dialog.showModal();
            dialog.onclick = (e) => {
                if (!dialog) return;
                let {left} = dialog.getBoundingClientRect();
                if (e.clientX < left) {
                    onclose();
                }

            };
        }
    })

    function onclose() {
        history.back();
    }

</script>


{#if page.state.selected}
    <div class="backdrop" transition:fade={{duration:200}}></div>
    <dialog bind:this={dialog} transition:fly={{opacity: 0, x: 500, duration: 300}}>
        <div class="floated">
            <Tappable onclick={onclose}>
                <Icon type="close"/>
            </Tappable>
        </div>
        <div class="content">
            <DialogComponent data={page.state.selected}/>
        </div>
    </dialog>
{/if}


<style>
    dialog {
        all: unset;
        z-index: 99999;
        position: absolute;
        top: 0;
        left: unset;
        right: 0;
        width: 1200px;
        height: 100%;
        max-width: 80%;
        background: var(--medium-color);
        display: flex;
        flex-direction: column;

        .floated {
            position: absolute;
            right: 1rem;
            top: 1rem;
            font-size: 2rem;
            color: #fff;
            z-index: 999;
        }

        .content {
            background: var(--background);
            display: flex;
            flex-flow: column;
            height: 100vh;
        }
    }

    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        z-index: 9999;
    }
</style>