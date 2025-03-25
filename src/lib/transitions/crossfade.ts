import {cubicOut} from 'svelte/easing';
import type {CrossfadeParams, TransitionConfig} from "svelte/transition";

const [send, receive] = transform({duration: 200});

export {send, receive};

//
export function transform({...defaults}) {
    const to_receive = new Map();
    const to_send = new Map();

    function crossfade(from_node: Element, node: Element, params: CrossfadeParams) {
        console.log({from_node, node})


        const {
            duration = (d: number) => Math.sqrt(d) * 30,
            easing = cubicOut
        } = Object.assign(Object.assign({}, defaults), params);
        const from = from_node.getBoundingClientRect();
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        return {
            delay: 0,
            duration: typeof duration === 'function' ? duration(d) : duration,
            easing,
            css: (t: number, u: number) => `
			   transform-origin: top left;
			   transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${
                t + (1 - t) * dh
            });
		   `
        };
    }

    function transition(items: Map<string, Element>, counterparts: Map<string, Element>, intro: boolean) {
        console.log({items, counterparts, intro})
        // @ts-expect-error TODO improve typings (are the public types wrong?)
        return (node: Element, params) => {
            items.set(params.key, node);
            return () => {
                if (counterparts.has(params.key)) {
                    const other_node = counterparts.get(params.key);
                    counterparts.delete(params.key);
                    if (!other_node) {
                        return {};
                    }
                    return crossfade(other_node, node, params);
                }
                items.delete(params.key);
                return {};
            };
        };
    }

    return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}