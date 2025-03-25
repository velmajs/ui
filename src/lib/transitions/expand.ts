import {linear} from "svelte/easing";

export function expand(node: HTMLElement, {delay = 0, duration = 300}) {
    let initialHeight = node.offsetHeight;
    node.style.overflow = "hidden";
    return {
        easing: linear,
        delay,
        duration,
        css: (t: number) => {
            return `
                height: ${Math.round(t * initialHeight)}px;
                opacity: ${t};
            `
        }
    };
}