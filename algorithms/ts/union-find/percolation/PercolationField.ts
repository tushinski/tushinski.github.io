import {
    ExtendedPercolationFieldSiteData,
    PercolationFieldSiteData
} from "../../types/entities/PercolationFieldSiteData";


export class PercolationField {
    readonly width: number;
    private sites: boolean[] = [];
    private blockedSiteSet = new Set<number>();

    constructor(width: number) {
        this.width = width;

        while (this.sites.length < this.width ** 2) {
            this.blockedSiteSet.add(this.sites.length);
            this.sites.push(false);
        }
    }

    get length() {
        return this.sites.length;
    }

    private getIndex(row: number, col: number): number {
        const index = row * this.width + col;

        if (this.sites[index] === undefined) {
            return NaN;
        }

        return index;
    }

    private getCoords(flatIndex: number) {
        const col = flatIndex % this.width;
        const row = (flatIndex - col) / this.width;

        return {row, col};
    }

    open(row: number, col: number) {
        const index = this.getIndex(row, col);

        return this.openSite(index, row, col);
    }

    private openByIndex(index: number) {
        const coords = this.getCoords(index);

        return this.openSite(index, coords.row, coords.col);
    }

    private openSite(index: number, row: number, col: number): ExtendedPercolationFieldSiteData {
        const openedNeighbourIndexes = this.getOpenedNeighbourSiteIndexes(row, col);

        if (this.sites[index]) {
            throw new Error("Cannot open site: the site already open.");
        }

        this.sites[index] = true;
        this.blockedSiteSet.delete(index);

        return {
            index,
            row,
            col,
            isOpen: true,
            isTopRow: row === 0,
            isBottomRow: row === this.width - 1,
            openedNeighbourIndexes,
        }
    }

    private getOpenedNeighbourSiteIndexes(row: number, col: number) {
        const indexes = [];
        const onSite = (row: number, col: number) => {
            const index = this.getIndex(row, col);

            if (!Number.isNaN(index) && this.sites[index]) {
                indexes.push(index);
            }
        };

        onSite(row - 1, col);
        onSite(row + 1, col);
        onSite(row, col - 1);
        onSite(row, col + 1);

        return indexes;
    }

    getNumberOfOpenSites() {
        return this.length - this.blockedSiteSet.size;
    }

    openRandom() {
        const randIndex = Math.floor(Math.random() * this.blockedSiteSet.size);
        const blockedSitesIt = this.blockedSiteSet.values();
        let index: number;

        for (let i = 0; i <= randIndex; i++) {
            index = blockedSitesIt.next().value;
        }

        return this.openByIndex(index);
    }

    eachSite(cb: (siteData: PercolationFieldSiteData) => void) {
        for (let i = 0; i < this.sites.length; i++) {
            const coords = this.getCoords(i);

            cb({
                index: i,
                row: coords.row,
                col: coords.col,
                isOpen: this.sites[i],
            });
        }
    }
}