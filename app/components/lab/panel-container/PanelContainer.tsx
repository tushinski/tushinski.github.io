import React, {useEffect, useState} from "react";
import s from "./PanelContainer.m.scss";
import {Canvas} from "../../../ts/canvas/Canvas";

export type PanelProps = {
    canvas: Canvas
};

type Props = {
    panel: React.FC<PanelProps>,
    canvasPromise: Promise<Canvas>,
};

type State = {
    canvas?: Canvas,
};

export const PanelContainer: React.FC<Props> = (props) => {
    const [state, setState] = useState<State>({});

    useEffect(() => {
        props.canvasPromise
            .then(canvas => {
                setState({canvas});
            })
    }, []);

    if (!state.canvas) {
        return null;
    }

    const Panel = props.panel;

    return (
        <div className={s.panelContainer}>
            <Panel
                canvas={state.canvas}
            />
        </div>
    )
}