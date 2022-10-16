import {AbstractQuickUnion} from "./AbstractQuickUnion";
import {IQuickUnion} from "../../types/interfaces/IQuickUnion";

/**
 * Quick Find (data structure).
 *
 * Find: O(1)
 *      (direct access by an index)
 * Union: O(N)
 *
 * Defects:
 *  - union too expensive
 */
export class QuickFind extends AbstractQuickUnion implements IQuickUnion {
    isConnected(p: number, q: number) {
        return this.indexArray[p] === this.indexArray[q];
    }

    union(p: number, q: number) {
        const pid = this.indexArray[p];
        const qid = this.indexArray[q];

        for (let i in this.indexArray) {
            if (this.indexArray[i] === pid) {
                this.indexArray[i] = qid;
            }
        }
    }
}