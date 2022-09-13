import {
    QuickFind,
    QuickUnion,
    UnionFindConstructor,
    WeightedQuickUnion,
    WeightedQuickUnionWithPathCompression
} from "../algorithms/ts/union-find/union-find";
import {Stack} from "../algorithms/ts/fundamental-data-structures/Stack";
import {add, naturals, removeAt} from "../algorithms/ts/utils/utils";
import {LinkedList} from "../algorithms/ts/fundamental-data-structures/LinkedList";
import {Queue} from "../algorithms/ts/fundamental-data-structures/Queue";

describe("Union-Find", () => {
    function testUnionFind(Structure: UnionFindConstructor) {
        const uf = Structure(10);

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
        testUnionFind(QuickFind);
    });
    test("Quick Union", () => {
        testUnionFind(QuickUnion);
    });
    test("Weighted Quick Union", () => {
        testUnionFind(WeightedQuickUnion);
    });
    test("Weighted Quick Union With Path Compression", () => {
        testUnionFind(WeightedQuickUnionWithPathCompression);
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
        array = add(array, 2, 11);
        list.add(0, 22);
        array = add(array, 0, 22);
        list.add(array.length, 33);
        array = add(array, array.length, 33);
        compareListAndArray();

        list.addFirst(44);
        array = add(array, 0, 44);
        list.addLast(55);
        array = add(array, array.length, 55);
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