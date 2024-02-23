import {PanelProps} from "../../panel-container/PanelContainer";
import React, {useEffect, useRef, useState} from "react";
import s from "./SnakeGamePanel.m.scss";
import {Button} from "../../button/Button";
import {Input} from "../../input/Input";
import {ParsedIntValue, parsedIntValue} from "../../../../ts/utils/parsedIntValueParams";
import {SquareField} from "../../../../ts/canvas/shapes/SquareField";
import {cssVar} from "../../../../ts/utils/cssVar";
import {ThemeColorVar} from "../../../../ts/types/enums/ThemeColorVar";
import {
    createSnakeGame,
    Direction,
    getRandomDirection, isOppositeDirections
} from "../../../../../algorithms/ts/snake-game/create-snake-game";
import {delay} from "../../../../ts/utils/delay";
import {Select} from "../../select/Select";
import {naturals} from "../../../../../algorithms/ts/utils/utils";
import {InfoList} from "../../info-list/InfoList";

type State = {
    isStarted: boolean,
    field?: SquareField,
    fieldSize: ParsedIntValue,
    speed: number,
    score: number,
};

const MIN_FIELD_CROSSING_TIME_MS = 800;
const MAX_FIELD_CROSSING_TIME_MS = 6000;
const MAX_SPEED = 6;
const speedOptions = naturals(MAX_SPEED, 1).map(value => value.toString());
const defaultSpeed = speedOptions[Math.floor((speedOptions.length - 1) / 2)];

const getMoveDelay = (fieldSize: number, speed: number) => {
    const fieldCrossingTimeDiff = MAX_FIELD_CROSSING_TIME_MS - MIN_FIELD_CROSSING_TIME_MS;
    const fieldCrossingTime = MIN_FIELD_CROSSING_TIME_MS + (fieldCrossingTimeDiff / MAX_SPEED * (MAX_SPEED - speed));

    return Math.round(fieldCrossingTime / fieldSize);
}

export const SnakeGamePanel: React.FC<PanelProps> = (props) => {
    const { canvas } = props;
    const [state, setState] = useState<State>({
        isStarted: false,
        fieldSize: parsedIntValue({
            defaultValue: 30,
            max: 60,
            min: 10
        }),
        speed: Number(defaultSpeed),
        score: 0,
    });
    const handleFieldSizeChange = (value: string) => {
        setState((prev) => {
            return {
                ...prev,
                fieldSize: prev.fieldSize.parse(value),
            }
        });
    }
    const handleSpeedChange = (value: string) => {
        setState((prev) => {
            return {
                ...prev,
                speed: Number(value),
            }
        });
    }
    const parameters = () => {
        if (state.isStarted) {
            return (
                <InfoList
                    title='Stat'
                    items={[{title: 'score', value: state.score.toString()}]}
                />
            )
        }

        return (
            <>
                <Input
                    value={state.fieldSize.text}
                    label="Field size"
                    onInput={handleFieldSizeChange}
                    error={!state.fieldSize.isValid && state.fieldSize.hint}
                />
                <Select
                    value={state.speed.toString()}
                    options={speedOptions}
                    label='Speed'
                    onSelect={handleSpeedChange}
                />
            </>
        )
    }
    const toggleGame = () => {
        setState((prev) => {
            return {
                ...prev,
                isStarted: !prev.isStarted,
                score: 0,
            }
        })
    };
    const hasInvalidParams = [state.fieldSize]
        .some(value => !value.isValid);

    const createField = () => {
        const fieldPadding = 50;
        const fieldWidth = Math.min(canvas.width, canvas.height) - fieldPadding;
        const field = new SquareField(canvas, {
            x: Math.floor((canvas.width - fieldWidth) / 2),
            y: Math.floor((canvas.height - fieldWidth) / 2),
            size: state.fieldSize.value,
            w: fieldWidth,
            h: fieldWidth,
            initialSiteColor: cssVar(ThemeColorVar.BLACK),
            siteBorderColor: cssVar(ThemeColorVar.BLACK),
            siteBorderWidth: 1,
        });

        field.drawEmpty();

        return field;
    }
    const createTileDrawer = (colorVar: ThemeColorVar) => (row: number, col: number) => {
        state.field?.fillSite(row, col, cssVar(colorVar));
    }
    const clearTile = createTileDrawer(ThemeColorVar.BLACK);
    const drawSnakeTile = createTileDrawer(ThemeColorVar.GREEN);
    const drawFruitTile = createTileDrawer(ThemeColorVar.PINK);
    const drawDamagedSnakeTile = createTileDrawer(ThemeColorVar.RED);
    const createGame = (fieldSize: number) => {
        return createSnakeGame({
            fieldSize: fieldSize,
            clearTile,
            drawSnakeTile,
            drawFruitTile,
            drawDamagedSnakeTile
        })
    }

    const startNewGame = () => {
        let isGameStopped = false;
        const move = createGame(state.fieldSize.value);
        const moveDelay = getMoveDelay(state.fieldSize.value, state.speed);
        let currentDirection: Direction;
        let direction = currentDirection = getRandomDirection();

        addDirectionListener((newDirection) => {
            direction = newDirection;
        });
        (async () => {
            while (!isGameStopped) {
                await delay(moveDelay);
                if (isGameStopped) {
                    break;
                }
                if (isOppositeDirections(currentDirection, direction)) {
                    direction = currentDirection;
                }
                const moveResult = move(direction);
                currentDirection = direction;
                if (moveResult.isGameOver) {
                    isGameStopped = true;
                    break;
                }
                setState((prev) => ({
                    ...prev,
                    score: moveResult.score,
                }));
            }
        })();

        return () => { isGameStopped = true; }
    }
    const addDirectionListener = (listener: (direction: Direction) => void) => {
        const keyToDirection = {
            'ArrowUp': Direction.UP,
            'ArrowDown': Direction.DOWN,
            'ArrowLeft': Direction.LEFT,
            'ArrowRight': Direction.RIGHT,
        }
        const handleKeydown = (event) => {
            if (keyToDirection[event.key]) {
                event.preventDefault();
                listener(keyToDirection[event.key]);
            }
        };
        window.addEventListener('keydown', handleKeydown);

        return () => window.removeEventListener('keydown', handleKeydown);
    }

    useEffect(() => {
        if (!state.fieldSize.isValid) {
            return;
        }
        setState((prev) => ({
            ...prev,
            field: createField(),
        }))
    }, [state.fieldSize]);

    useEffect(() => {
        if (!state.isStarted) {
            state.field?.drawEmpty();
            return;
        }
        return startNewGame();
    }, [state.isStarted]);


    return (
        <div className={s.panel}>
            { parameters() }
            <Button
                title={state.isStarted ? 'Exit' : 'New game'}
                onClick={toggleGame}
                disabled={hasInvalidParams}
            />
        </div>
    )
}