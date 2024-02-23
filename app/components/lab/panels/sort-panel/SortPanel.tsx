import {PanelProps} from "../../panel-container/PanelContainer";
import React, {SyntheticEvent, useEffect, useState} from "react";
import s from "./SortPanel.m.scss";
import {SortingFunctionDemo} from "../../../../../algorithms/ts/types/interfaces/SortingFunctionDemo";
import {selectionSortDemo} from "../../../../../algorithms/ts/sorting/selectionSort";
import {insertionSortDemo} from "../../../../../algorithms/ts/sorting/insertionSort";
import {shellsortDemo} from "../../../../../algorithms/ts/sorting/shellsort";
import {Select} from "../../select/Select";
import {SortDiagram} from "../../../../ts/canvas/shapes/SortDiagram";
import {cssVar} from "../../../../ts/utils/cssVar";
import {ThemeColorVar} from "../../../../ts/types/enums/ThemeColorVar";
import {naturals, numberComparator} from "../../../../../algorithms/ts/utils/utils";
import {Canvas} from "../../../../ts/canvas/Canvas";
import {delay} from "../../../../ts/utils/delay";
import {Button} from "../../button/Button";
import {ParsedIntValue, parsedIntValue} from "../../../../ts/utils/parsedIntValueParams";
import {Input} from "../../input/Input";
import {cancellableSortingDemo} from "./utils/cancellable-sorting-demo";
import {knuthShuffle} from "../../../../../algorithms/ts/sorting/knuthShuffle";
import {mergeSortDemo} from "../../../../../algorithms/ts/sorting/mergeSort";
import {bottomUpMergeSortDemo} from "../../../../../algorithms/ts/sorting/bottomUpMergeSort";

type State = {
    isDemoStarted: boolean,
    sort: string,
    numberOfValues: ParsedIntValue,
    stepDelay: ParsedIntValue,
    values: number[],
    diagram?: SortDiagram
};

const nameToSort: Record<string, SortingFunctionDemo> = {
    'Selection sort': selectionSortDemo,
    'Insertion sort': insertionSortDemo,
    'Shellsort': shellsortDemo,
    'Merge sort': mergeSortDemo,
    'Bottom-up merge sort': bottomUpMergeSortDemo,
}

export const SortPanel: React.FC<PanelProps> = (props) => {
    const { canvas } = props;
    const DEFAULT_NUMBER_OF_VALUES = 60;
    const DEFAULT_STEP_DELAY = 10;
    const [state, setState] = useState<State>({
        isDemoStarted: false,
        sort: Object.keys(nameToSort)[0],
        numberOfValues: parsedIntValue({
            min: 10,
            max: 200,
            defaultValue: DEFAULT_NUMBER_OF_VALUES,
        }),
        stepDelay: parsedIntValue({
            min: 1,
            max: 1000,
            defaultValue: DEFAULT_STEP_DELAY,
        }),
        values: knuthShuffle(naturals(DEFAULT_NUMBER_OF_VALUES, 1)),
    });

    const onSortSelect = (sortName: string) => {
        setState((prev) => ({
            ...prev,
            sort: sortName
        }));
    }

    const parameters = () => {
        if (state.isDemoStarted) {
            return null;
        }

        return (
            <>
                <Select
                    value={state.sort}
                    options={Object.keys(nameToSort)}
                    label="Algorithm"
                    onSelect={onSortSelect}
                />
                <Input
                    value={state.numberOfValues.text}
                    label="Number of elements"
                    onInput={handleNumberOfValuesChange}
                    error={!state.numberOfValues.isValid && state.numberOfValues.hint}
                />
                <Input
                    value={state.stepDelay.text}
                    label="Step delay"
                    onInput={handleStepDelayChange}
                    error={!state.stepDelay.isValid && state.stepDelay.hint}
                />
            </>
        )
    }

    const createDiagram = (canvas: Canvas) => {
        const diagramPadding = 20;
        const diagramWidth = canvas.width - diagramPadding * 2;
        const diagramHeight = canvas.height - diagramPadding * 2;

        return new SortDiagram(canvas, {
            x: diagramPadding,
            y: diagramPadding,
            w: diagramWidth,
            h: diagramHeight,
            pointerColor: cssVar(ThemeColorVar.RED),
            columnColor: cssVar(ThemeColorVar.GRAY),
            sortedColumnColor: cssVar(ThemeColorVar.BLACK),
        });
    };

    const genValues = (n: number) => knuthShuffle(naturals(n, 1));

    useEffect(() => {
        const diagram = createDiagram(canvas);

        diagram.drawCols(state.values);

        setState((prev) => ({
            ...prev,
            diagram,
        }));
    }, []);

    useEffect(() => {
        if (!state.diagram) {
            setState((prev) => ({
                ...prev,
                diagram: createDiagram(canvas)
            }))
        }
    }, [state.diagram]);

    useEffect(() => {
        if (state.isDemoStarted) {
            return startDemo();
        }
        setState((prev) => ({
            ...prev,
            values: genValues(state.numberOfValues.value),
        }));
    }, [state.isDemoStarted]);

    useEffect(() => {
        state.diagram?.clearPointer();
        state.diagram?.drawCols(state.values);
    }, [state.values]);

    const startDemo = () => {
        const sortDemo = nameToSort[state.sort];

        const handlePointer = (i: number) => {
            state.diagram?.drawPointer(i);
            return delay(state.stepDelay.value);
        };
        const handleValuesChange = (values: number[]) => {
            state.diagram?.drawCols(values);
            return delay(state.stepDelay.value);
        }
        const cancellableDemo = cancellableSortingDemo(sortDemo);

        return cancellableDemo(
            numberComparator,
            [...state.values],
            {
                onPointer: handlePointer,
                onChange: handleValuesChange,
            }
        );
    }

    const toggleDemo = () => {
        setState((prev) => ({
            ...prev,
            isDemoStarted: !prev.isDemoStarted,
        }));
    }

    const handleNumberOfValuesChange = (newValue: string) => {
        setState((prev) => {
            const parsedValue = prev.numberOfValues.parse(newValue);

            return {
                ...prev,
                numberOfValues: parsedValue,
                values: parsedValue.isValid ? genValues(parsedValue.value) : prev.values,
            }
        });
    }

    const handleStepDelayChange = (newValue: string) => {
        setState((prev) => ({
            ...prev,
            stepDelay: prev.stepDelay.parse(newValue),
        }))
    };

    const hasInvalidParams = [state.numberOfValues, state.stepDelay]
        .some(value => !value.isValid);

    return (
        <div className={s.panel}>
            { parameters() }
            <Button
                title={state.isDemoStarted ? "Reset" : "Start"}
                onClick={toggleDemo}
                disabled={hasInvalidParams}
            />
        </div>
    )
}