import {SortingFunction} from "../types/interfaces/SortingFunction";
import {CompareFunction} from "../types/interfaces/CompareFunction";
import {SortingFunctionDemo, SortingFunctionDemoOptions} from "../types/interfaces/SortingFunctionDemo";
import {merge, mergeDemo} from "./mergeSort";

/**
 * Bottom-up merge sort
 */
export const bottomUpMergeSort: SortingFunction = (compare, values) => {
    const buffer: typeof values = [];
    const length = values.length;

    for (let size = 1; size < length; size = size * 2) {
        for (let startIndex = 0; startIndex < length - size; startIndex += size * 2) {
            const middleIndex = startIndex + size - 1;
            const endIndex = Math.min(startIndex + size * 2 - 1, length - 1);

            merge(compare, values, buffer, startIndex, middleIndex, endIndex);
        }
    }

    return values;
}

export const bottomUpMergeSortDemo: SortingFunctionDemo = async (compare, values, options) => {
    const buffer: typeof values = [];
    const length = values.length;

    for (let size = 1; size < length; size = size * 2) {
        for (let startIndex = 0; startIndex < length - size; startIndex += size * 2) {
            const middleIndex = startIndex + size - 1;
            const endIndex = Math.min(startIndex + size * 2 - 1, length - 1);

            await mergeDemo(options, compare, values, buffer, startIndex, middleIndex, endIndex);
        }
    }
}