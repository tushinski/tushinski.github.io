import {CompareFunction} from "../types/interfaces/CompareFunction";

export function naturals(n: number, from = 0) {
    let arr: number[] = [];

    for (let i = from; i < from + n; i++) {
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

export const numberComparator: CompareFunction<number> = (a, b) => a - b;