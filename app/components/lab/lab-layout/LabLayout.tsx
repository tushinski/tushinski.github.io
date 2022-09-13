import React, {useState} from "react";
import s from "./LabLayout.m.scss";
import {PanelContainer, PanelProps} from "../panel-container/PanelContainer";
import {CanvasComponent} from "../canvas/CanvasComponent";
import {ArrowBack} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {Canvas} from "../../../ts/canvas/Canvas";
import classNames from "classnames";
import {cssVar} from "../../../ts/utils/cssVar";

type Props = {
    title: string,
    panelComponent: React.FC<PanelProps>,
};

type State = {
};

export const LabLayout: React.FC<Props> = (props) => {
    const isMobile = matchMedia(`(max-width: 768px)`).matches;
    const Panel = props.panelComponent;
    let canvas = null;

    const canvasPromise = new Promise<Canvas>((res, rej) => {
        canvas = <CanvasComponent postStage={res} />;
    });

    return (
        <div className={s.layout}>
            <div className={s.mobileMessage}>
                Currently, lab projects are not supported on mobile version.
            </div>
            {!isMobile &&
                <>
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
                </>
            }
        </div>
    )
}