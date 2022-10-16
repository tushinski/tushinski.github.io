export function naturals(n: number) {
    let arr: number[] = [];

    for (let i = 0; i < n; i++) {
        arr.push(i);
    }

    return arr;
}

export function removeAt(arr: any[], index: number) {
    return arr.slice(0, index).concat(arr.slice(index + 1));
}

export function insertAt(arr: any[], index: number, value: any) {
    const left = arr.slice(0, index);
    left.push(value);
    return left.concat(arr.slice(index));
}