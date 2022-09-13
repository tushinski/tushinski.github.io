export function cssVar(name: string) {
    return getComputedStyle(document.body)
        .getPropertyValue(name);
}