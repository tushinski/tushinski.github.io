export class Queue<T> {
    private head?: Node<T>;
    private tail?: Node<T>;

    enqueue(value: T): void {
        const node: Node<T> = {
            value
        };

        if (this.size === 0) {
            this.head = this.tail = node;
        } else {
            this.tail!.next = node;
            this.tail = node;
        }
    }

    dequeue(): T {
        if (this.size === 0) {
            throw new Error('Cannot dequeue an element: the queue is empty.');
        }

        const node = this.head!;

        if (this.head === this.tail) {
            this.head = this.tail = undefined;
        } else {
            this.head = this.head!.next;
        }

        return node.value;
    }

    get size() {
        let size = 0;
        let node = this.head;

        while (node) {
            size++;
            node = node.next;
        }

        return size;
    }

    toArray() {
        let node = this.head;
        let array = [];

        while (node) {
            array.push(node.value);
            node = node.next;
        }

        return array;
    }
}

type Node<T> = {
    value: T;
    next?: Node<T>;
}