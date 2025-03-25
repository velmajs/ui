import {goto} from "$app/navigation";

export function tappable(node: HTMLElement, props?: { href?: string, onclick?: Function }) {
    const click = (e: Event) => {
        let {href, onclick} = props || {};

        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        onclick?.(e);
        if (href) {
            goto(href);
        }
    }

    node.onclick = click;

    node.onkeydown = (e) => {
        // arrow up
        if (e.key === 'ArrowUp') {
            // tab to previous
            const prevElement = node.previousElementSibling as HTMLElement | null;
            prevElement?.focus();
        }
        // arrow down
        if (e.key === 'ArrowDown') {
            // tab to next
            // tab to previous
            const nextElement = node.nextElementSibling as HTMLElement | null;
            nextElement?.focus();
        }
        if (e.key === 'Enter' || e.key === ' ') {
            click(e);
        }
    };
}