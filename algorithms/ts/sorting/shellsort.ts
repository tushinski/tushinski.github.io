import {SortingFunction} from "../types/interfaces/SortingFunction";
import {swap} from "./swap";
import {SortingFunctionDemo} from "../types/interfaces/SortingFunctionDemo";

/**
 * Shellsort.
 *
 * Developed by American computer scientist Donald Shell in 1959.
 *
 * Increment sequence formula: 3x + 1 is enough (or Sedgewick's sequence, which is more efficient).
 * For 3x + 1 increment:
 *      Worst case: N^(3/2) compares.
 */
export const shellsort: SortingFunction = (compare, values) => {
    let h = 1;

    // Starting increment from 3x + 1 sequence
    while (h < Math.floor(values.length / 3)) {
        h = h * 3 + 1;
    }

    // Until increment 'h' is 1 or greater
    while (h >= 1) {

        // Insertion sort with increment 'h'
        for (let i = h; i < values.length; i++) {
            for (let j = i; j >= h; j -= h) {
                if (compare(values[j], values[j - h]) >= 0) {
                    break;
                }
                swap(values, j, j - h);
            }
        }

        h = Math.floor(h / 3); // getting next (lesser) increment
    }

    return values;
}

export const shellsortDemo: SortingFunctionDemo = async (compare, values, options) => {
    let h = 1;
    while (h < Math.floor(values.length / 3)) {
        h = h * 3 + 1;
    }
    while (h >= 1) {
        for (let i = h; i < values.length; i++) {
            for (let j = i; j >= h; j -= h) {
                await options.onPointer(j);
                if (compare(values[j], values[j - h]) >= 0) {
                    break;
                }
                swap(values, j, j - h);
                await options.onChange(values);
            }
        }

        h = Math.floor(h / 3);
    }
}