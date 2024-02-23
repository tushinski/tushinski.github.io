import React from "react";
import {CustomLabRoomProps} from "../lab-room/lab-room";
import s from "./custom-lab-room-layout.m.scss"


type State = {
};

export const CustomLabRoomLayout: React.FC<CustomLabRoomProps> = (props) => {
    const Room = props.component

    return (
        <div className={s.layout}>
            <div className={s.mainArea}>
                <Room/>
            </div>
        </div>
    )
}