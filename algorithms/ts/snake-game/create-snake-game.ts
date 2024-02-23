import {getIntRandom} from "../math-utils/get-int-random";
import {Range, getRanges} from "../math-utils/get-ranges";
import {LinkedList} from "../fundamental-data-structures/LinkedList";
import {delay} from "../../../app/ts/utils/delay";

type DrawTile = (row: number, col: number) => void;
type Tile = {
    row: number,
    col: number
};
type GameOptions = {
    fieldSize: number,
    clearTile: DrawTile,
    drawSnakeTile: DrawTile,
    drawFruitTile: DrawTile,
    drawDamagedSnakeTile: DrawTile,
}
type GameState = {
    snake: LinkedList<Tile>
    fruitTile: Tile,
}
export type MakeGameStep = (direction: Direction) => {score: number, isGameOver: boolean};
export enum Direction {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    UP = 'UP',
    DOWN = 'DOWN'
}

const getIntRandomFromRanges = (ranges: Range[]): number => {
    const rangeRandoms = ranges.map(range => getIntRandom(range[0], range[1]));

    return rangeRandoms[getIntRandom(0, rangeRandoms.length - 1)];
}
export const getRandomDirection = (): Direction => {
    const directions = Object.values(Direction);

    return directions[getIntRandom(0, directions.length - 1)] as Direction;
}
export const isOppositeDirections = (d1: Direction, d2: Direction) => {
    switch (d1) {
        case Direction.UP:
            return d2 === Direction.DOWN;
        case Direction.DOWN:
            return d2 === Direction.UP;
        case Direction.LEFT:
            return d2 === Direction.RIGHT;
        case Direction.RIGHT:
            return d2 === Direction.LEFT;
    }
}
const getNeighbourTile = (tile: Tile, direction: Direction, fieldSize: number): Tile => {
    const fixOverflow = (value: number) => {
        if (value < 0) {
            return fieldSize + value;
        }
        if (value >= fieldSize) {
            return value - (fieldSize);
        }
        return value;
    }

    switch (direction) {
        case Direction.LEFT:
            return {
                row: tile.row,
                col: fixOverflow(tile.col - 1)
            }
        case Direction.RIGHT:
            return {
                row: tile.row,
                col: fixOverflow(tile.col + 1)
            }
        case Direction.UP:
            return {
                row: fixOverflow(tile.row - 1),
                col: tile.col
            }
        case Direction.DOWN:
            return {
                row: fixOverflow(tile.row + 1),
                col: tile.col
            }
    }
}

const isSameTile = (t1: Tile, t2: Tile) => {
    return t1.row === t2.row && t1.col === t2.col;
}

const getRandomTile = (fieldSize: number): Tile => {
    return {
        row: getIntRandom(0, fieldSize - 1),
        col: getIntRandom(0, fieldSize - 1),
    }
}
const getRandomEmptyTile = (fieldSize: number, filledTiles: Tile[]): Tile => {
    const rowToCols = new Map<number, Set<number>>();
    const filledRows = new Set<number>();

    filledTiles.forEach(tile => {
        if (!rowToCols.has(tile.row)) {
            rowToCols.set(tile.row, new Set());
        }
        const cols = rowToCols.get(tile.row);

        cols.add(tile.col);
        if (cols.size === fieldSize) {
            filledRows.add(tile.row);
        }
    });

    const availableRowRanges = getRanges(0, fieldSize - 1, filledRows);
    const randomRow = getIntRandomFromRanges(availableRowRanges);
    const randomCol = (() => {
        if (rowToCols.has(randomRow)) {
            const emptyColRanges = getRanges(0, fieldSize - 1, rowToCols.get(randomRow));
            return getIntRandomFromRanges(emptyColRanges);
        }
        return getIntRandom(0, fieldSize - 1);
    })();

    return {row: randomRow, col: randomCol};
}

export const createSnakeGame = (options: GameOptions): MakeGameStep => {
    const createSnake = () => {
        const snake = new LinkedList<Tile>();
        snake.addFirst(getRandomTile(options.fieldSize));
        return snake;
    }
    const createGameState = (): GameState => {
        const snake = createSnake();

        return {
            snake,
            fruitTile: getRandomEmptyTile(options.fieldSize, snake.toArray()),
        };
    }
    const getScore = () => state.snake.size - 1;
    const state = createGameState();
    const getFilledTiles = () => [...state.snake.toArray(), state.fruitTile];

    options.drawSnakeTile(state.snake.first().row, state.snake.first().col);
    options.drawFruitTile(state.fruitTile.row, state.fruitTile.col);

    return (direction: Direction) => {
        const nextTile = getNeighbourTile(state.snake.first(), direction, options.fieldSize);
        const nextTileIsSnakeTile = state.snake.some((tile) => isSameTile(tile, nextTile));
        const nextTileIsSnakeTale = isSameTile(state.snake.last(), nextTile);
        const nextTileIsFruitTile = isSameTile(state.fruitTile, nextTile);
        const spawnNewFruit = () => {
            state.fruitTile = getRandomEmptyTile(options.fieldSize, getFilledTiles());
            options.drawFruitTile(state.fruitTile.row, state.fruitTile.col);
        }
        const removeSnakeTale = () => {
            const tail = state.snake.last()
            options.clearTile(tail.row, tail.col)
            state.snake.removeLast()
        }
        const moveSnakeHead = () => {
            state.snake.addFirst(nextTile);
            options.drawSnakeTile(nextTile.row, nextTile.col);
        }

        if (nextTileIsSnakeTile && !nextTileIsSnakeTale) {
            options.drawDamagedSnakeTile(nextTile.row, nextTile.col)

            return {
                score: getScore(),
                isGameOver: true,
            }
        }
        if (nextTileIsFruitTile) {
            moveSnakeHead()
            spawnNewFruit()
        } else {
            removeSnakeTale()
            moveSnakeHead()
        }

        return {
            score: getScore(),
            isGameOver: false,
        };
    }
}