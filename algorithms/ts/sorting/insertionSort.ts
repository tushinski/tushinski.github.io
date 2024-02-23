import {SortingFunction} from "../types/interfaces/SortingFunction";
import {swap} from "./swap";
import {SortingFunctionDemo} from "../types/interfaces/SortingFunctionDemo";

/**
 * Insertion sort.
 *
 * Best case (array is in ascending order): N - 1 compares, 0 swaps.
 * Average case (randomly-ordered array): ~1/4(N^2) compares, ~1/4(N^2) swaps.
 * Worst case (array is in descending order): ~1/2(N^2) compares, ~1/2(N^2) swaps.
 * For partially sorted array (sorted array with N unsorted appended values) runs in linear time.
 */
export const insertionSort: SortingFunction = (compare, values) => {
    for (let i = 0; i < values.length; i++) {
        for (let j = i; j > 0; j--) {
            if (compare(values[j - 1], values[j]) >= 0) {
                swap(values, j - 1, j);
            } else {
                break;
            }
        }
    }

    return values;
}

export const insertionSortDemo: SortingFunctionDemo = async (compare, values, options) => {
    for (let i = 0; i < values.length; i++) {
        for (let j = i; j > 0; j--) {
            await options.onPointer(j);
            if (compare(values[j - 1], values[j]) >= 0) {
                swap(values, j - 1, j);
                await options.onChange(values);
            } else {
                break;
            }
        }
    }
}