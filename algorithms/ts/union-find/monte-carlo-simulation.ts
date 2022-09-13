import {Percolation, PercolationSiteMarks} from "./percolation";
import "regenerator-runtime/runtime";

export type SiteData = {
    row: number,
    col: number,
    isOpen: boolean,
    isFilled: boolean
};

export type ForEachPercolationSite = ReturnType<typeof Percolation>["forEachSite"];

export type MCSProps = {
    experiments: number,
    fieldSize: number,
    stepTimeout: number,
    experimentTimeout: number,
    onIterationResult: (data: [MCSExperimentIterationResult, ForEachPercolationSite]) => void,
    onResult: (props: MCSResult) => void,
}

export type MCSResult = {
    experiments: number,
    threshold: number,
    sharpness: number,
    finished: boolean,
}

export class MCS {
    private results: number[] = [];
    private currentExperiment: MCSExperiment;
    private isStopped = false;

    constructor(private props: MCSProps) {
    }

    private runExperiment(): Promise<number> {
        this.currentExperiment = new MCSExperiment({
            fieldSize: this.props.fieldSize,
            stepTimeout: this.props.stepTimeout,
            onIterationMade: this.props.onIterationResult
        });

        return this.currentExperiment.run();
    }

    private getThreshold(): number {
        return this.results.reduce((sum, n) => sum + n, 0) / this.results.length;
    }

    private getSharpness(threshold: number): number {
        if (!threshold || this.results.length === 1) {
            return NaN;
        }

        return Math.sqrt(
            this.results
                .reduce((sum, n) => sum + (n - threshold) ** 2, 0)
            / this.results.length - 1
        );
    }

    async run(): Promise<void> {
        for (let i = 0; i < this.props.experiments; i++) {
            if (this.isStopped) {
                return;
            }
            if (i > 0 && this.props.experimentTimeout) {
                await new Promise((res) => {
                    setTimeout(res, this.props.experimentTimeout);
                });
            }
            if (this.isStopped) {
                return;
            }
            this.results.push(await this.runExperiment());

            const threshold = this.getThreshold();
            this.props.onResult({
                experiments: this.results.length,
                threshold,
                sharpness: this.getSharpness(threshold),
                finished: i === this.props.experiments - 1,
            });
        }
    }

    stop() {
        this.isStopped = true;
        this.currentExperiment?.stop();
    }
}


export type MCSExperimentIterationResult = {
    sites: number,
    openSites: number,
    percolates: boolean,
    filledUnions: number,
    connectedToBottomUnions: number,
}

type MCSExperimentProps = {
    fieldSize: number,
    stepTimeout: number,
    onIterationMade: (data: [MCSExperimentIterationResult, ForEachPercolationSite]) => void,
}

class MCSExperiment {
    private percolation: ReturnType<typeof Percolation>;
    private iterationTimeout: number;
    private isStopped = false;

    constructor(private props: MCSExperimentProps) {
    }

    private makeIteration() {
        this.percolation.openRandom();
        const markedUnionStat = this.percolation.getMarkedUnionStat();

        this.props.onIterationMade([
            {
                sites: this.props.fieldSize ** 2,
                openSites: this.percolation.getNumberOfOpenSites(),
                percolates: this.percolation.hasPercolation(),
                filledUnions: markedUnionStat[PercolationSiteMarks.CONNECTED_TO_TOP] || 0,
                connectedToBottomUnions: markedUnionStat[PercolationSiteMarks.CONNECTED_TO_BOTTOM] || 0,
            },
            this.percolation.forEachSite
        ]);
    }

    private nextIteration(endCallback: () => void) {
        this.iterationTimeout = window.setTimeout(() => {
            if (this.isStopped) {
                endCallback();
                return;
            }

            this.makeIteration();
            if (this.percolation.hasPercolation()) {
                endCallback();
            } else {
                this.nextIteration(endCallback);
            }
        }, this.props.stepTimeout);
    }

    async run(): Promise<number> {
        this.percolation = Percolation(this.props.fieldSize);

        return new Promise<number>((res, rej) => {
            this.nextIteration(() => {
                res(this.percolation.getNumberOfOpenSites())
            });
        });
    }

    stop() {
        this.isStopped = true;
        clearTimeout(this.iterationTimeout);
    }
}