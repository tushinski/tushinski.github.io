import {Stack} from "../algorithms/ts/fundamental-data-structures/Stack";
import {insertAt, naturals, removeAt} from "../algorithms/ts/utils/utils";
import {LinkedList} from "../algorithms/ts/fundamental-data-structures/LinkedList";
import {Queue} from "../algorithms/ts/fundamental-data-structures/Queue";
import {IQuickUnion} from "../algorithms/ts/union-find/quick-union/IQuickUnion";
import {QuickFind} from "../algorithms/ts/union-find/quick-union/QuickFind";
import {QuickUnion} from "../algorithms/ts/union-find/quick-union/QuickUnion";
import {WeightedQuickUnion} from "../algorithms/ts/union-find/quick-union/WeightedQuickUnion";
import {
    WeightedQuickUnionWithPathCompression
} from "../algorithms/ts/union-find/quick-union/WeightedQuickUnionWithPathCompression";
import {CompareFunction} from "../algorithms/ts/types/interfaces/CompareFunction";
import {SortingFunction} from "../algorithms/ts/types/interfaces/SortingFunction";
import {selectionSort} from "../algorithms/ts/sorting/selectionSort";
import {insertionSort} from "../algorithms/ts/sorting/insertionSort";
import {shellsort} from "../algorithms/ts/sorting/shellsort";
import {knuthShuffle} from "../algorithms/ts/sorting/knuthShuffle";
import {mergeSort} from "../algorithms/ts/sorting/mergeSort";
import {bottomUpMergeSort} from "../algorithms/ts/sorting/bottomUpMergeSort";
import {getRanges} from "../algorithms/ts/math-utils/get-ranges";

describe("Union-Find", () => {
    const structureSize = 10;

    function testUnionFind(uf: IQuickUnion) {
        uf.union(0, 1);
        expect(uf.isConnected(0, 1)).toBe(true);
        expect(uf.isConnected(1,0)).toBe(true);
        expect(uf.isConnected(1,2)).toBe(false);

        uf.union(8, 9);
        uf.union(0, 9);
        expect(uf.isConnected(0, 8)).toBe(true);
        expect(uf.isConnected(1, 9)).toBe(true);
        expect(uf.isConnected(0, 3)).toBe(false);
        expect(uf.isConnected(8, 7)).toBe(false);
    }

    test("Quick Find", () => {
        testUnionFind(new QuickFind(structureSize));
    });
    test("Quick Union", () => {
        testUnionFind(new QuickUnion(structureSize));
    });
    test("Weighted Quick Union", () => {
        testUnionFind(new WeightedQuickUnion(structureSize));
    });
    test("Weighted Quick Union With Path Compression", () => {
        testUnionFind(new WeightedQuickUnionWithPathCompression(structureSize));
    });
});

describe("Fundamental Data Structures", () => {
    test("LinkedList", () => {
        const list = new LinkedList<number>();
        let array = naturals(10);

        const compareListAndArray = () => {
            expect(list.toArray()).toEqual(array);
            expect(list.size).toBe(array.length);

            if (array.length > 0) {
                expect(list.first()).toBe(array[0]);
                expect(list.last()).toBe(array[array.length - 1]);

                const it = list.iterator();
                for (let i = 0; i < array.length; i++) {
                    expect(it.next().value).toBe(array[i]);
                    expect(list.get(i)).toBe(array[i]);
                }
            }
        };

        array.forEach(n => list.addLast(n));
        compareListAndArray();

        expect(list.removeLast()).toBe(array.pop());
        expect(list.removeFirst()).toBe(array.shift());
        expect(list.remove(2)).toBe(array[2]);
        array = removeAt(array, 2);
        compareListAndArray();

        list.add(2, 11);
        array = insertAt(array, 2, 11);
        list.add(0, 22);
        array = insertAt(array, 0, 22);
        list.add(array.length, 33);
        array = insertAt(array, array.length, 33);
        compareListAndArray();

        list.addFirst(44);
        array = insertAt(array, 0, 44);
        list.addLast(55);
        array = insertAt(array, array.length, 55);
        compareListAndArray();

        let i = 0;

        while (list.size) {
            expect(i < array.length).toBe(true);
            list.removeLast();
        }

        expect(list.size).toBe(0);
        expect(() => { list.first() }).toThrowError();
        expect(() => { list.last() }).toThrowError();
        expect(() => { list.get(0) }).toThrowError();
        expect(() => { list.removeLast() }).toThrowError();
        expect(() => { list.removeFirst() }).toThrowError();
        expect(list.toArray()).toEqual([]);
    });

    test("Stack", () => {
        const stack = new Stack();
        const array = naturals(10);

        expect(stack.size).toBe(0);
        expect(stack.pop()).toBe(undefined);

        array
            .forEach(n => stack.push(n));

        expect(stack.size).toBe(array.length);
        expect(stack.toArray()).toEqual(array);

        for (let i = array.length - 1; i >= -1; i--) {
            expect(stack.pop()).toBe(array.pop());
            expect(stack.toArray()).toEqual(array);
            expect(stack.size).toBe(array.length);
        }

        for (let i = 0; i < 10; i++) {
            stack.push(i);
            array.push(i);
            expect(stack.toArray()).toEqual(array);
            expect(stack.size).toBe(array.length);
        }
    });

    test("Queue", () => {
        const queue = new Queue<number>();
        const array = naturals(10);

        expect(queue.size).toBe(0);
        expect(() => { queue.dequeue() }).toThrowError();

        const compareQueueAndArray = () => {
            expect(queue.toArray()).toEqual(array);
            expect(queue.size).toBe(array.length);
        };

        array
            .forEach(element => queue.enqueue(element));
        compareQueueAndArray();

        while (array.length) {
            expect(queue.dequeue()).toBe(array.shift());
            compareQueueAndArray();
        }

        expect(queue.size).toBe(0);
        expect(() => { queue.dequeue() }).toThrowError();
    });
});

describe("Sorting",() => {
    const integerComparator: CompareFunction<number> = (a, b) => a - b;
    const composeSort = <T>(compareFunc: CompareFunction<T>, sortingFunc: SortingFunction) => {
        return (values: T[]) => sortingFunc(compareFunc, values);
    }
    const testSort = (sortingFunc: SortingFunction) => {
        const sort = composeSort(integerComparator, sortingFunc);
        const testValues = (values: number[], expectedResult: number[]) => {
            expect(sort(values)).toEqual(expectedResult);
        }
        const largeSortedArray = [11, 109, 150, 211, 317, 403, 475, 567, 573, 588, 591, 616, 684, 711, 796, 885, 907, 931, 969];
        const toShuffled = (array: any[]) => knuthShuffle([...array]);

        // Same result
        testValues([], []);
        testValues([0], [0]);
        testValues([0,1], [0,1]);
        testValues([0,1,2,3,4,5], [0,1,2,3,4,5]); // already sorted (ascending order)

        // Should sort
        testValues([1,0], [0,1]); // swap 2 elements
        testValues([4,3,2,1,0], [0,1,2,3,4]); // descending order
        testValues([4,1,2,3,0], [0,1,2,3,4]); // swap 2 elements on both ends
        testValues([0,1,3,2,4], [0,1,2,3,4]); // swap 2 elements in the middle
        testValues([0,4,1,3,2], [0,1,2,3,4]); // random

        for (let i = 0; i < 10; i++) {
            testValues(toShuffled(largeSortedArray), largeSortedArray);
        }
    }

    test("Selection sort", () => {
        testSort(selectionSort);
    });
    test("Insertion sort", () => {
        testSort(insertionSort);
    });
    test("Shellsort", () => {
        testSort(shellsort);
    });
    test("Merge sort", () => {
        testSort(mergeSort);
    });
    test("Bottom-up merge sort", () => {
        testSort(bottomUpMergeSort);
    });
})

describe('Math utils', () => {
    it('Get ranges', () => {
        // full range
        expect(getRanges(0, 10, new Set([])))
            .toEqual([[0,10]]);
        expect(getRanges(0, 0, new Set()))
            .toEqual([[0,0]]);

        // edge cases
        expect(getRanges(0, 10, new Set([0])))
            .toEqual([[1,10]]);
        expect(getRanges(0, 10, new Set([10])))
            .toEqual([[0,9]]);
        expect(getRanges(0, 1, new Set([0])))
            .toEqual([[1, 1]]);
        expect(getRanges(0, 1, new Set([1])))
            .toEqual([[0, 0]]);

        // no ranges
        expect(getRanges(0, 1, new Set([0, 1])))
            .toEqual([]);
        expect(getRanges(0, 10, new Set([0,1,2,3,4,5,6,7,8,9,10])))
            .toEqual([]);

        // different ranges
        expect(getRanges(0, 10, new Set([1])))
            .toEqual([[0,0], [2,10]]);
        expect(getRanges(0, 10, new Set([2,5,6,7])))
            .toEqual([[0,1],[3,4],[8,10]]);
        expect(getRanges(0, 10, new Set([2,6])))
            .toEqual([[0,1],[3,5],[7,10]]);
    })
})