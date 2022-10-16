import "regenerator-runtime/runtime";
import {Percolation} from "../percolation/Percolation";
import {MCSExperiment, MCSExperimentIterationResult} from "./MCSExperiment";


export type EachPercolationSite = Percolation["eachSite"];

export type MCSProps = {
    experiments: number,
    fieldSize: number,
    stepTimeout: number,
    experimentTimeout: number,
    onIterationResult: (data: [MCSExperimentIterationResult, EachPercolationSite]) => void,
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
            onIterationResult: this.props.onIterationResult
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