import {page} from "$app/state";

export function isActiveRoute(href: string, fullMatch: boolean = false) {
    return page.url.pathname === href || (!fullMatch && page.url.pathname.startsWith(href))
}