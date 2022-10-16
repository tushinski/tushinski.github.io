import {naturals} from "../../utils/utils";

export abstract class AbstractQuickUnion {
    readonly length: number;
    protected readonly indexArray: number[];

    constructor(length: number) {
        if (length < 0) {
            throw new Error("Illegal argument length.");
        }

        this.length = length;
        this.indexArray = naturals(length);
    }
}