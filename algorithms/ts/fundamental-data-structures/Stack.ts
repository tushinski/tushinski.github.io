
class Node<T> {
    constructor(
        public value: T,
        public next?: Node<T>,
    ) {}
}

/**
 * Stack data structure.
 * Implemented based on a unidirectional linked list.
 *
 * In most cases there's no reason for implementing stack in JavaScript,
 * because native push/pop methods of the Array prototype are O(1).
 */
export class Stack<T> {
    private head: Node<T>;
    private _size = 0;

    pop() {
        if (this.head) {
            const value = this.head.value;

            this.head = this.head.next;
            this._size--;

            return value;
        }

        return undefined;
    }

    push(value: T) {
        this.head = new Node(value, this.head);
        this._size++;
    }

    get size() {
        return this._size;
    }

    /**
     * Must return an array containing stack elements ordered from first-added to last-added,
     *  so the result of calling "pop" on the array will be the same as of calling "pop" on the stack.
     */
    toArray() {
        const arr: T[] = [];

        let node = this.head;

        while (node) {
            arr.unshift(node.value);
            node = node.next;
        }

        return arr;
    }
}