import React from "react";
import s from "./ProjectsPage.m.scss";
import {ProjectList} from "../../projects/project-list/ProjectList";

type Props = {
};

type State = {
};

export const ProjectsPage: React.FC<Props> = (props) => {
    return (
        <div className={s.page}>
            <ProjectList/>
        </div>
    )
}