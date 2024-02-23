import React from "react";
import s from "./canvas-lab-room-layout.m.scss";
import {PanelContainer} from "../panel-container/PanelContainer";
import {Canvas} from "../../../ts/canvas/Canvas";
import {CanvasComponent} from "../canvas/CanvasComponent";
import {CanvasLabRoomProps} from "../lab-room/lab-room";


type State = {
};

export const CanvasLabRoomLayout: React.FC<CanvasLabRoomProps> = (props) => {
    const Panel = props.panelComponent;
    let canvas = null;

    const canvasPromise = new Promise<Canvas>((res) => {
        canvas = <CanvasComponent postStage={res} />;
    });

    return (
        <div className={s.layout}>
            <div className={s.mainArea}>
                <div className={s.canvasContainer}>
                    { canvas }
                </div>
            </div>
            <div className={s.sideArea}>
                <PanelContainer
                    panel={Panel}
                    canvasPromise={canvasPromise}
                />
            </div>
        </div>
    )
}