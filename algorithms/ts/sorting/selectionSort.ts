import {SortingFunction} from "../types/interfaces/SortingFunction";
import {swap} from "./swap";
import {SortingFunctionDemo} from "../types/interfaces/SortingFunctionDemo";

/**
 * Selection sort.
 *
 * ~ N^2 compares, N swaps.
 * Takes quadratic time, even if input already sorted.
 */
export const selectionSort: SortingFunction = (compare, values) => {
    for (let i = 0; i < values.length; i++) {
        let minIndex = i;

        for (let j = i; j < values.length; j++) {
            if (compare(values[j], values[minIndex]) < 0) {
                minIndex = j;
            }
        }

        swap(values, i, minIndex);
    }

    return values;
}

export const selectionSortDemo: SortingFunctionDemo = async (compare, values, options) => {
    for (let i = 0; i < values.length; i++) {
        let minIndex = i;

        for (let j = i; j < values.length; j++) {
            await options.onPointer(j);
            if (compare(values[j], values[minIndex]) < 0) {
                minIndex = j;
            }
        }

        swap(values, i, minIndex);
        await options.onChange(values);
    }
}