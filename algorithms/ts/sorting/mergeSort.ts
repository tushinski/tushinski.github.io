import {SortingFunction} from "../types/interfaces/SortingFunction";
import {CompareFunction} from "../types/interfaces/CompareFunction";
import {SortingFunctionDemo, SortingFunctionDemoOptions} from "../types/interfaces/SortingFunctionDemo";

/**
 * Merge sort
 */
export const mergeSort: SortingFunction = (compare, values) => {
    return sort(compare, values);
}

const sort = <T>(compare: CompareFunction<T>, values: T[], buffer: T[] = [], startIndex = 0, endIndex = values.length - 1) => {
    if (startIndex >= endIndex) {
        return values;
    }
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    sort(compare, values, buffer, startIndex, middleIndex);
    sort(compare, values, buffer, middleIndex + 1, endIndex);
    merge(compare, values, buffer, startIndex, middleIndex, endIndex);

    return values;
}

export const merge = <T>(compare: CompareFunction<T>, values: T[], buffer: T[], startIndex: number, middleIndex: number, endIndex: number) => {
    let i = startIndex;
    let j = middleIndex + 1;

    for (let k = 0; k < values.length; k++) {
        buffer[k] = values[k];
    }

    for (let k = startIndex; k <= endIndex; k++) {
        if (i > middleIndex) {
            values[k] = buffer[j++];
        }
        else if (j > endIndex) {
            values[k] = buffer[i++];
        }
        else if (compare(buffer[i], buffer[j]) < 0) {
            values[k] = buffer[i++];
        } else {
            values[k] = buffer[j++];
        }
    }
}

export const mergeSortDemo: SortingFunctionDemo = async (compare, values, options) => {
    await sortDemo(options, compare, values);
}

const sortDemo = async <T>(demoOptions: SortingFunctionDemoOptions<T>, compare: CompareFunction<T>, values: T[], buffer: T[] = [], startIndex = 0, endIndex = values.length - 1) => {
    if (startIndex >= endIndex) {
        return values;
    }
    const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);

    await sortDemo(demoOptions, compare, values, buffer, startIndex, middleIndex);
    await sortDemo(demoOptions, compare, values, buffer, middleIndex + 1, endIndex);
    await mergeDemo(demoOptions, compare, values, buffer, startIndex, middleIndex, endIndex);

    return values;
}


export const mergeDemo =
    async <T>(demoOptions: SortingFunctionDemoOptions<T>, compare: CompareFunction<T>, values: T[], buffer: T[], startIndex: number, middleIndex: number, endIndex: number) => {
        let i = startIndex;
        let j = middleIndex + 1;

        for (let k = 0; k < values.length; k++) {
            buffer[k] = values[k];
        }

        for (let k = startIndex; k <= endIndex; k++) {
            await demoOptions.onPointer(k);
            if (i > middleIndex) {
                values[k] = buffer[j++];
            }
            else if (j > endIndex) {
                values[k] = buffer[i++];
            }
            else if (compare(buffer[i], buffer[j]) < 0) {
                values[k] = buffer[i++];
            } else {
                values[k] = buffer[j++];
            }
            await demoOptions.onChange(values);
        }
    }