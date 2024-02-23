import {swap} from "./swap";

/**
 * Knuth Shuffle.
 *
 * Creates a uniformly random permutation in linear time.
 * O(N) swaps.
 */
export const knuthShuffle = <T>(values: T[]): T[] => {
    for (let i = 0; i < values.length; i++) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        swap(values, i, randomIndex);
    }

    return values;
}