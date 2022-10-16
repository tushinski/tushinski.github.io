import {Percolation} from "../percolation/Percolation";
import {EachPercolationSite} from "./MCS";

export type MCSExperimentIterationResult = {
    sites: number,
    openSites: number,
    percolates: boolean,
}

type MCSExperimentProps = {
    fieldSize: number,
    stepTimeout: number,
    onIterationResult: (data: [MCSExperimentIterationResult, EachPercolationSite]) => void,
}

export class MCSExperiment {
    private percolation: Percolation;
    private iterationTimeout: number;
    private isStopped = false;

    constructor(private props: MCSExperimentProps) {
    }

    private makeIteration() {
        this.percolation.openRandom();

        this.props.onIterationResult([
            {
                sites: this.props.fieldSize ** 2,
                openSites: this.percolation.getNumberOfOpenSites(),
                percolates: this.percolation.hasPercolation(),
            },
            this.percolation.eachSite
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
        this.percolation = new Percolation(this.props.fieldSize);

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