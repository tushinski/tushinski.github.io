import {AbstractQuickUnion} from "./AbstractQuickUnion";
import {IQuickUnion} from "../../types/interfaces/IQuickUnion";

/**
 * Wighted Quick Union (data structure).
 *
 * Is the Quick Union with balanced trees.
 *
 * Find: O(lg(N))
 *      (depth of any node in the balanced tree can be at most lg(N))
 *
 * Union: O(lg(N))
 */
export class WeightedQuickUnion extends AbstractQuickUnion implements IQuickUnion {
    protected readonly treeSizes: number[];

    constructor(length: number) {
        super(length);
        this.treeSizes = this.indexArray.map(() => 1);
    }

    protected getRoot(p: number) {
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

        // link smaller tree to the bigger one
        if (this.treeSizes[pRoot] > this.treeSizes[qRoot]) {
            this.indexArray[qRoot] = this.indexArray[pRoot];
            this.treeSizes[pRoot] += this.treeSizes[qRoot];
        } else {
            this.indexArray[pRoot] = this.indexArray[qRoot];
            this.treeSizes[qRoot] += this.treeSizes[pRoot];
        }
    }
}