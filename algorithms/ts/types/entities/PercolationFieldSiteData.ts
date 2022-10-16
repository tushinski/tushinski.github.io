export type PercolationFieldSiteData = {
    index: number,
    row: number,
    col: number,
    isOpen: boolean,
}

export type ExtendedPercolationFieldSiteData = PercolationFieldSiteData & {
    isTopRow: boolean,
    isBottomRow: boolean,
    openedNeighbourIndexes: number[],
}

export type PercolationSiteData = PercolationFieldSiteData & {
    isFilled: boolean,
}