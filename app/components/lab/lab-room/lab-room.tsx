import React from "react";
import {PanelProps} from "../panel-container/PanelContainer";
import isMobile from 'is-mobile';
import {CanvasLabRoomLayout} from "../canvas-lab-room-layout/canvas-lab-room-layout";
import {CustomLabRoomLayout} from "../custom-lab-room-layout/custom-lab-room-layout";
import s from "./lab-room.m.scss"

export type CustomLabRoomProps = {
    component: React.FC
}

export type CanvasLabRoomProps = {
    panelComponent: React.FC<PanelProps>
}

export const isCanvasLabRoomProps = (props: LabRoomProps): props is CanvasLabRoomProps => {
    return !props.hasOwnProperty('component') && props.hasOwnProperty('panelComponent')
}

export type LabRoomProps = {
    desktopOnly?: boolean,
} & (CustomLabRoomProps | CanvasLabRoomProps);


export const LabRoom: React.FC<LabRoomProps> = (props) => {
    if (props.desktopOnly && isMobile()) {
        return (
            <div className={s.container}>
                <div>Sorry, this lab room is not available for mobile browsers.</div>
            </div>
        )
    }

    if (isCanvasLabRoomProps(props)) {
        return (
            <CanvasLabRoomLayout {...props} />
        )
    }

    return (
        <CustomLabRoomLayout {...props}/>
    )
}