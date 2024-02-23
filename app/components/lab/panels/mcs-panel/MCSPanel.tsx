import {PanelProps} from "../../panel-container/PanelContainer";
import {SyntheticEvent, useEffect, useState} from "react";
import React from "react";
import s from "./MCSPanel.m.scss";
import {SquareField} from "../../../../ts/canvas/shapes/SquareField";
import {parsedIntValue, ParsedIntValue} from "../../../../ts/utils/parsedIntValueParams";
import {cssVar} from "../../../../ts/utils/cssVar";
import {ThemeColorVar} from "../../../../ts/types/enums/ThemeColorVar";
import {Input} from "../../input/Input";
import {InfoList} from "../../info-list/InfoList";
import {Button} from "../../button/Button";
import {
    EachPercolationSite,
    MCS,
    MCSExperimentIterationResult, MCSResult
} from "../../../../../algorithms/ts/union-find/monte-carlo-simulation/MCS";

type State = {
    field?: SquareField,
    fieldSize: ParsedIntValue,
    experiments: ParsedIntValue,
    stepTimeout: ParsedIntValue,
    experimentTimeout: ParsedIntValue,
    simulation: MCS | null,
    simulationStarted: boolean,
    iterationResult: MCSExperimentIterationResult,
    result: MCSResult,
};

export const MCSPanel: React.FC<PanelProps> = (props) => {
    const { canvas } = props;
    const [state, setState] = useState<State>({
        fieldSize: parsedIntValue({
            min: 2,
            max: 50,
            defaultValue: 20,
        }),
        experiments: parsedIntValue({
            min: 2,
            defaultValue: 10,
        }),
        stepTimeout: parsedIntValue({
            min: 4,
        }),
        experimentTimeout: parsedIntValue({
            min: 4,
            defaultValue: 500,
        }),
        simulation: null,
        simulationStarted: false,
        iterationResult: defaultIterationResult(),
        result: defaultResult(),
    });

    const createNewField = () => {
        const fieldPadding = 50;
        const fieldWidth = Math.min(canvas.width, canvas.height) - fieldPadding;
        const field = new SquareField(canvas, {
            x: Math.floor((canvas.width - fieldWidth) / 2),
            y: Math.floor((canvas.height - fieldWidth) / 2),
            size: state.fieldSize.value,
            w: fieldWidth,
            h: fieldWidth,
            initialSiteColor: cssVar(ThemeColorVar.BLACK),
            siteBorderColor: cssVar(ThemeColorVar.GRAY),
            siteBorderWidth: 1,
        });

        field.drawEmpty();

        setState((prev) => ({
            ...prev,
            field,
        }));
    };

    const onIterationResult = ([iterationResult, forEachSite]: [MCSExperimentIterationResult, EachPercolationSite]) => {
        forEachSite((site) => {
            const siteColor = (() => {
                if (site.isFilled) {
                    return cssVar(ThemeColorVar.BLUE);
                }
                if (site.isOpen) {
                    return cssVar(ThemeColorVar.WHITE);
                }
            })();

            state.field.fillSite(site.row, site.col, siteColor);
        });

        setState((prev) => ({
            ...prev,
            iterationResult,
        }));
    }

    const onResult = (result: MCSResult) => {
        setState((prev) => ({
            ...prev,
            result,
        }));
    };

    useEffect(() => {
        if (state.simulationStarted) {
            state.simulation.run();
        } else if (state.fieldSize.isValid) {
            createNewField();
        }
    }, [state.fieldSize, state.simulation]);

    if (!state.field) {
        return null;
    }

    function simulationParameters() {
        if (state.simulationStarted) {
            return null;
        }

        function getOnFieldInput(statePropKey: keyof State) {
            return function onFieldInput(newValue: string) {
                const parsedValue = state[statePropKey] as ParsedIntValue;

                setState((prev) => ({
                    ...prev,
                    [statePropKey]: parsedValue.parse(newValue),
                }));
            }
        }

        return (
            <>
                <Input
                    value={state.fieldSize.text}
                    label="Field size"
                    onInput={getOnFieldInput("fieldSize")}
                    error={!state.fieldSize.isValid && state.fieldSize.hint}
                />
                <Input
                    value={state.experiments.text}
                    label="Experiments"
                    onInput={getOnFieldInput("experiments")}
                    error={!state.experiments.isValid && state.experiments.hint}
                />
                <Input
                    value={state.stepTimeout.text}
                    label="Step timeout"
                    onInput={getOnFieldInput("stepTimeout")}
                    error={!state.stepTimeout.isValid && state.stepTimeout.hint}
                />
                <Input
                    value={state.experimentTimeout.text}
                    label="Experiment timeout"
                    onInput={getOnFieldInput("experimentTimeout")}
                    error={!state.experimentTimeout.isValid && state.experimentTimeout.hint}
                />
            </>
        )
    }

    function infoList(title: string, data: Record<string, any>) {
        const items = Object.entries(data)
            .map(([title, value]) => {
                let stringValue: string;

                if (typeof value === "number") {
                    if (Number.isNaN(value)) {
                        stringValue = "-";
                    } else {
                        stringValue = value.toLocaleString('en-US', {maximumFractionDigits: 2});
                    }
                } else {
                    stringValue = value.toString();
                }

                return {
                    title,
                    value: stringValue
                }
            });

        return (
            <InfoList
                title={title}
                items={items}
            />
        )
    }

    function defaultResult(): MCSResult {
        return {
            experiments: 0,
            threshold: NaN,
            sharpness: NaN,
            finished: false,
        }
    }

    function defaultIterationResult(): MCSExperimentIterationResult {
        return {
            sites: NaN,
            openSites: NaN,
            percolates: false,
            filledUnions: NaN,
            connectedToBottomUnions: NaN,
        }
    }

    function iterationResult() {
        if (!(state.simulationStarted)) {
            return null;
        }

        return infoList("Current experiment", state.iterationResult);
    }

    function result() {
        if (!(state.simulationStarted)) {
            return null;
        }

        return infoList("Simulation", state.result);
    }

    function toggleSimulation() {
        const isStarted = state.simulationStarted;

        if (isStarted) {
            state.simulation.stop();
            setState((prev) => ({
                ...prev,
                simulation: null,
                simulationStarted: false,
                iterationResult: defaultIterationResult(),
                result: defaultResult(),
            }));
        } else {
            const simulation = new MCS({
                experiments: state.experiments.value,
                fieldSize: state.fieldSize.value,
                stepTimeout: state.stepTimeout.value,
                experimentTimeout: state.experimentTimeout.value,
                onIterationResult,
                onResult,
            });
            setState((prev) => ({
                ...prev,
                simulation,
                simulationStarted: true,
            }));
        }
    }

    const hasInvalidParams = [state.fieldSize, state.experiments, state.stepTimeout]
        .some(value => !value.isValid);

    return (
        <div className={s.panel}>
            { simulationParameters() }
            { iterationResult() }
            { result() }
            <Button
                title={state.simulationStarted ? "Reset" : "Start"}
                onClick={toggleSimulation}
                disabled={hasInvalidParams}
            />
        </div>
    )
}