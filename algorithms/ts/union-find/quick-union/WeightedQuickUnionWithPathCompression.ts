import {WeightedQuickUnion} from "./WeightedQuickUnion";
import {IQuickUnion} from "../../types/interfaces/IQuickUnion";

/**
 * Weighted Quick Union With Path Compression (data structure).
 *
 * Is the Weighted Quick Union with a path compression.
 * Line (1) allows to half the path to the root.
 */
export class WeightedQuickUnionWithPathCompression extends WeightedQuickUnion implements IQuickUnion {
    protected getRoot(p: number) {
        while (this.indexArray[p] !== p) {
            this.indexArray[p] = this.indexArray[this.indexArray[p]]; // (1)
            p = this.indexArray[p];
        }
        return p;
    }
}