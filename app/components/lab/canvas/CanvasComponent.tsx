import React, {useEffect, useRef} from "react";
import s from "./Canvas.m.scss";
import {Canvas} from "../../../ts/canvas/Canvas";

type Props = {
    postStage: (canvas: Canvas) => void,
};

type State = {
};

export const CanvasComponent: React.FC<Props> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = new Canvas({
            canvasEl: canvasRef.current!,
            square: true,
        });

        props.postStage(canvas);
    }, []);

    return (
        <canvas
            className={s.canvas}
            ref={canvasRef}
        />
    )
}