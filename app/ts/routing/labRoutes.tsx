import React from "react";
import {MCSPanel} from "../../components/lab/panels/mcs-panel/MCSPanel";
import {SortPanel} from "../../components/lab/panels/sort-panel/SortPanel";
import {SnakeGamePanel} from "../../components/lab/panels/snake-game-panel/SnakeGamePanel";
import {LabRoomProps} from "../../components/lab/lab-room/lab-room";

export type LabRoute = {
    path: string,
    title: string,
    description: string,
    roomProps: LabRoomProps
}

export const labRoutes: Record<string, LabRoute> = {
    mcs: {
        path: "monte-carlo-simulation",
        title: "Monte Carlo Simulation",
        description: (
            "Monte Carlo Simulation, also known as the Monte Carlo Method or a multiple " +
            "probability simulation, is a mathematical technique, which is used to estimate " +
            "the possible outcomes of an uncertain event."
        ),
        roomProps: {
            panelComponent: MCSPanel
        }
    },
    sort: {
        path: "sort",
        title: "Sorting algorithms",
        description: (
            "Efficient sorting is important for optimizing the efficiency of other " +
            "algorithms (such as search and merge algorithms) that require input data to be " +
            "in sorted lists. Sorting is also often useful for canonicalizing data and for " +
            "producing human-readable output."
        ),
        roomProps: {
            panelComponent: SortPanel
        }
    },
    snakeGame: {
        path: "snake-game",
        title: "Snake game",
        description: "A simple Snake Game written in functional style.",
        roomProps: {
            panelComponent: SnakeGamePanel,
            desktopOnly: true,
        }
    },
}