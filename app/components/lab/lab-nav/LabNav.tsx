import React from "react";
import {labRoutes} from "../../../ts/routing/labRoutes";
import s from "./LabNav.m.scss";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {ThemeColorVar} from "../../../ts/types/enums/ThemeColorVar";
import {cssVar} from "../../../ts/utils/cssVar";
import {ProjectItem} from "../../ui/elements/project-item/ProjectItem";
import isMobile from 'is-mobile';

const isMobileBrowser = isMobile(); // TODO: move to state

type Props = {
};

type State = {
};

export const LabNav: React.FC<Props> = (props) => {
    const colors = [
        ThemeColorVar.RED,
        ThemeColorVar.ORANGE,
        ThemeColorVar.GREEN,
        ThemeColorVar.BLUE,
        ThemeColorVar.DEEP_PURPLE,
    ]
        .map(varName => cssVar(varName));

    function items() {
        return Object
            .values(labRoutes)
            .filter((data) => data.path)
            .map((data, i) => {
                const colorIndex = i % colors.length;

                return (
                    <ProjectItem
                        key={data.path}
                        title={data.title}
                        description={data.description}
                        path={data.path}
                        linkIcon={<PlayCircleOutlineIcon/>}
                        style={{color: colors[colorIndex]}}
                        disabled={data.desktopOnly && isMobileBrowser}
                    />
                )
            });
    }

    return (
        <div className={s.nav}>
            {items()}
        </div>
    )
}