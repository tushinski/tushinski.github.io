import {LinkedList} from "./LinkedList";


export class Queue<T> {
    private list = new LinkedList<T>();

    enqueue(value: T) {
        this.list.addLast(value);
    }

    dequeue(): T {
        return this.list.removeFirst();
    }

    get size() {
        return this.list.size;
    }

    toArray() {
        return this.list.toArray();
    }
}