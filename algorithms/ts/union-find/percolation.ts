import {MarkedWeightedQuickUnionWithPathCompression} from "./union-find";
import {SiteData} from "./monte-carlo-simulation";

const SitesField = (size: number) => {
    const sites: boolean[][] = [];
    const blockedSiteSet = new Set<number>();

    for (let i = 0; i < size; i++) {
        sites.push([]);
        for (let j = 0; j < size; j++) {
            sites[i].push(false);
            blockedSiteSet.add(coordsToIndex(i, j));
        }
    }

    function coordsToIndex(row: number, col: number) {
        if (row >= size || row < 0 || col >= size || col < 0) {
            throw new Error(`Site [${row}, ${col}] is out of the field.`);
        }

        return row * size + col;
    }

    function indexToCoords(index: number) {
        const col = index % size;
        const row = (index - col) / size;

        return {row, col};
    }

    function isOpen(row: number, col: number) {
        return sites[row][col];
    }

    function open (row: number, col: number) {
        sites[row][col] = true;
        blockedSiteSet.delete(coordsToIndex(row, col));
    }

    function forEachNeighbourSite(row: number, col: number, cb: (row: number, column: number, index: number, isOpen: boolean) => void) {
        [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1],
        ].forEach(([row, col]) => {
            if (row < size && row >= 0 && col < size && col >= 0) {
                cb(row, col, coordsToIndex(row, col), isOpen(row, col));
            }
        });
    }

    function getNumberOfOpenSites() {
        return size ** 2 - blockedSiteSet.size;
    }

    function getRandomBlockedSite() {
        const randIndex = Math.floor(Math.random() * blockedSiteSet.size);
        const blockedSitesIt = blockedSiteSet.values();
        let siteIndex: number;

        for (let i = 0; i <= randIndex; i++) {
            siteIndex = blockedSitesIt.next().value;
        }

        return {
            siteIndex,
            ...indexToCoords(siteIndex)
        };
    }

    function getSites() {
        return sites;
    }

    return {
        isOpen,
        open,
        forEachNeighbourSite,
        getNumberOfOpenSites,
        getRandomBlockedSite,
        coordsToIndex,
        indexToCoords,
        getSites,
    }
};

export enum PercolationSiteMarks {
    CONNECTED_TO_BOTTOM = "CONNECTED_TO_BOTTOM",
    CONNECTED_TO_TOP = "CONNECTED_TO_TOP",
}

export const Percolation = (fieldSize: number) => {
    const uf = MarkedWeightedQuickUnionWithPathCompression(fieldSize ** 2);
    const field = SitesField(fieldSize);
    let percolation = false;

    function isFilled(row: number, col: number) {
        return (row === 0 && field.isOpen(row, col)) ||
            uf.isInMarkedUnion(field.coordsToIndex(row, col), [PercolationSiteMarks.CONNECTED_TO_TOP]);
    }

    function open(row: number, col: number) {
        if (field.isOpen(row, col)) {
            return;
        }

        const index = field.coordsToIndex(row, col);

        field.open(row, col);

        function onNeighbourSite(nRow: number, nCol: number, nIndex: number, isOpen: boolean) {
            if (isOpen) {
                const marks = [
                    (row === 0 || nRow === 0) && PercolationSiteMarks.CONNECTED_TO_TOP,
                    (row === fieldSize - 1 || nRow === fieldSize - 1) && PercolationSiteMarks.CONNECTED_TO_BOTTOM,
                ];
                uf.union(nIndex, index, marks);
            }
        }

        field.forEachNeighbourSite(row, col, onNeighbourSite);

        if (uf.isInMarkedUnion(index, [PercolationSiteMarks.CONNECTED_TO_TOP, PercolationSiteMarks.CONNECTED_TO_BOTTOM])) {
            percolation = true;
        }
    }

    function hasPercolation() {
        return percolation;
    }

    function getNumberOfOpenSites() {
        return field.getNumberOfOpenSites();
    }

    function openRandom(): {row: number, col: number, isFilled: boolean} {
        const site = field.getRandomBlockedSite();

        open(site.row, site.col);

        return {
            row: site.row,
            col: site.col,
            isFilled: isFilled(site.row, site.col)
        };
    }

    function forEachSite(cb: (site: SiteData) => void) {
        for (let i = 0; i < fieldSize; i++) {
            for (let j = 0; j < fieldSize; j++) {
                cb({
                    row: i,
                    col: j,
                    isOpen: field.isOpen(i, j),
                    isFilled: isFilled(i, j)
                })
            }
        }
    }

    return {
        open,
        openRandom,
        hasPercolation,
        getNumberOfOpenSites,
        forEachSite,
        getMarkedUnionStat: uf.getMarkedUnionStat
    }
};