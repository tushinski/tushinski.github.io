import {AbstractQuickUnion} from "./AbstractQuickUnion";
import {IQuickUnion} from "../../types/interfaces/IQuickUnion";

/**
 * Quick Union (data structure).
 *
 * Find (getRoot): O(N)
 * Union: O(N)
 *      (excluding cases where p and q are already connected)
 *
 * Defects:
 *  - trees can get too tall
 *  - find too expensive
 */
export class QuickUnion extends AbstractQuickUnion implements IQuickUnion {
    private getRoot(p: number) {
        while (this.indexArray[p] !== p) {
            p = this.indexArray[p];
        }
        return p;
    }

    isConnected(p: number, q: number) {
        return this.getRoot(p) === this.getRoot(q);
    }

    union(p: number, q: number) {
        const qRoot = this.getRoot(q);
        const pRoot = this.getRoot(p);
        this.indexArray[pRoot] = this.indexArray[qRoot];
    }
}