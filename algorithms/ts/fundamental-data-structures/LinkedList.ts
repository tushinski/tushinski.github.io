
class Node<T> {
    constructor(
        public value: T,
        public next?: Node<T>,
        public prev?: Node<T>,
    ) {}
}

export interface LinkedListIterator<T> {
    next(): LinkedListIteratorValue<T>;
    prev(): LinkedListIteratorValue<T>;
    insert(value: T);
    remove();
}

export interface LinkedListIteratorValue<T> {
    value?: T,
    done: boolean,
}

/**
 * Bidirectional Linked List data structure.
 *
 * Insertion/removing of current element (with iterator) - O(1).
 * Get/add/remove first/last element - O(1).
 */
export class LinkedList<T> {
    private head: Node<T>;
    private tail: Node<T>;
    private _size = 0;

    private getNode(index: number) {
        let node = this.head;
        let i = 0;

        while (i !== index) {
            node = node.next;
            if (!node) {
                break;
            }
            i++;
        }

        return node;
    }

    first() {
        if (!this.head) {
            throw new Error("Cannot get the first element of an empty list.");
        }

        return this.head.value;
    }

    last() {
        if (!this.tail) {
            throw new Error("Cannot get the first element of an empty list.");
        }

        return this.tail.value;
    }

    private insertBefore(targetPosNode: Node<T>, value: T): Node<T> {
        const newNode = new Node(value);

        if (!targetPosNode) {
            this.addLast(value);
            return newNode;
        }
        this._size++;

        if (!targetPosNode.prev) {
            this.head = newNode;
        } else {
            targetPosNode.prev.next = newNode;
            newNode.prev = targetPosNode.prev;
        }

        targetPosNode.prev = newNode;
        newNode.next = targetPosNode;

        return newNode;
    }

    addFirst(value: T) {
        this.insertBefore(this.head, value);
    }

    addLast(value: T) {
        if (!this.head) {
            this.head = this.tail = new Node(value);
        } else {
            this.tail.next = new Node(value);
            this.tail.next.prev = this.tail;
            this.tail = this.tail.next;
        }
        this._size++;
    }

    add(index: number, value: T) {
        if (index < 0 || index > this.size) {
            throw new Error("Index is out of bounds.");
        }

        if (index === 0) {
            this.addFirst(value);
            return;
        }

        if (index === this.size) {
            this.addLast(value);
            return;
        }

        this.insertBefore(this.getNode(index), value);
    }

    private removeNode(node: Node<T>): T {
        if (!node.prev && !node.next) {
            this.head = this.tail = undefined;
            this._size = 0;
            return node.value;
        }

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }

        this._size--;

        return node.value;
    }

    remove(index: number): T {
        if (index < 0 || index > this.size) {
            throw new Error("Index is out of bounds.");
        }

        if (index === 0) {
            return this.removeFirst();
        }

        if (index === this.size - 1) {
            return this.removeLast();
        }

        return this.removeNode(this.getNode(index));
    }

    removeFirst(): T {
        this.first();

        return this.removeNode(this.head);
    }

    removeLast(): T {
        this.last();

        return this.removeNode(this.tail);
    }

    get(index: number): T {
        const node = this.getNode(index);

        if (!node) {
            throw new Error("Index is out of bounds.");
        }

        return node.value;
    }

    set(index: number, value: T) {
        const node = this.getNode(index);

        if (!node) {
            throw new Error("Index is out of bounds.");
        }

        node.value = value;
    }

    get size() {
        return this._size;
    }

    [Symbol.iterator] = (): LinkedListIterator<T> => {
        let next = this.head;
        let lastIterated: Node<T>;

        return {
            next: () => {
                if (next) {
                    let result = {
                        value: next.value,
                        done: false,
                    };
                    lastIterated = next;
                    next = next.next;

                    return result;
                } else {
                    lastIterated = undefined;
                    return {
                        done: true,
                    };
                }
            },
            prev: () => {
                let result: LinkedListIteratorValue<T>;

                if (!next) {
                    if (this.size) {
                        result = {
                            value: this.tail.value,
                            done: false,
                        };
                        next = lastIterated = this.tail;
                    } else {
                        result = {
                            done: true,
                        }
                    }
                } else {
                    result = {
                        value: next.prev?.value,
                        done: false,
                    }
                    next = next.prev || next;
                }

                return result;
            },
            insert: (value: T) => {
                this.insertBefore(next, value);
                lastIterated = undefined;
            },
            remove: () => {
                if (!lastIterated) {
                    throw new Error("Cannot remove current element: no current element.");
                }
                this.removeNode(lastIterated);
            }
        }
    }

    iterator() {
        return this[Symbol.iterator]();
    }

    forEach(cb: (value: T) => void) {
        for (let value of this) {
            cb(value);
        }
    }

    every(predicate: (value: T) => boolean): boolean {
        for (let value of this) {
            if (!predicate(value)) {
                return false;
            }
        }
        return true;
    }

    some(predicate: (value: T) => boolean): boolean {
        for (let value of this) {
            if (predicate(value)) {
                return true;
            }
        }
        return false;
    }

    toArray(): T[] {
        const arr = [];
        let node = this.head;

        while (node) {
            arr.push(node.value);
            node = node.next;
        }

        return arr;
    }
}