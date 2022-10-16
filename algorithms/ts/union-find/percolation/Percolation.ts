import {PercolationField} from "./PercolationField";
import {PercolationSiteData} from "../../types/entities/PercolationFieldSiteData";
import {WeightedQuickUnionWithPathCompression} from "../quick-union/WeightedQuickUnionWithPathCompression";
import {IQuickUnion} from "../quick-union/IQuickUnion";


export class Percolation {
    private readonly uf: IQuickUnion;
    private readonly field: PercolationField;
    private readonly connectedToTopUnionRoot: number;
    private readonly connectedToBottomUnionRoot: number;
    private percolation = false;

    constructor(fieldSize: number) {
        this.field = new PercolationField(fieldSize);
        this.connectedToTopUnionRoot = this.field.length;
        this.connectedToBottomUnionRoot = this.field.length + 1;
        this.uf = new WeightedQuickUnionWithPathCompression(this.field.length + 2);
    }

    isFilledSite(index: number) {
        return this.uf.isConnected(index, this.connectedToBottomUnionRoot);
    }

    hasPercolation() {
        return this.percolation;
    }

    getNumberOfOpenSites() {
        return this.field.getNumberOfOpenSites();
    }

    openRandom(): PercolationSiteData {
        const site = this.field.openRandom();

        site.openedNeighbourIndexes.forEach(index => {
            this.uf.union(index, site.index);
        });

        if (site.isTopRow) {
            this.uf.union(site.index, this.connectedToTopUnionRoot);
        } else if (site.isBottomRow) {
            this.uf.union(site.index, this.connectedToBottomUnionRoot);
        }

        if (this.uf.isConnected(this.connectedToTopUnionRoot, this.connectedToBottomUnionRoot)) {
            this.percolation = true;
        }

        return {
            index: site.index,
            row: site.row,
            col: site.col,
            isOpen: site.isOpen,
            isFilled: this.isFilledSite(site.index)
        };
    }

    eachSite = (cb: (site: PercolationSiteData) => void) => {
        this.field.eachSite((fieldSiteData) => {
           cb({
               ...fieldSiteData,
               isFilled: this.uf.isConnected(fieldSiteData.index, this.connectedToTopUnionRoot),
           })
        });
    }
}