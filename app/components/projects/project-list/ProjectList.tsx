import React from "react";
import {ProjectData} from "../../../ts/types/entities/ProjectData";
import s from "./ProjectList.m.scss";
import {ProjectItem} from "../../ui/elements/project-item/ProjectItem";
import {OpenInNew} from "@mui/icons-material";

type Props = {
};

type State = {
};

export const ProjectList: React.FC<Props> = (props) => {
    const data: ProjectData[] = [
        {
            title: "ts-rest",
            description: "Universal REST API client for TypeScript.",
            url: "https://github.com/tushinski/ts-rest",
        },
    ];

    function list() {
        return data.map(projectData => (
            <ProjectItem
                key={projectData.url}
                title={projectData.title}
                description={projectData.description}
                url={projectData.url}
                linkIcon={<OpenInNew/>}
            />
        ))
    }

    return (
        <div className={s.list}>
            {list()}
        </div>
    )
}