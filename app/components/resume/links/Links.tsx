import React from "react";
import {LinkData} from "../../../ts/types/entities/LinkData";

type Props = {
};

type State = {
};

export const Links: React.FC<Props> = (props) => {
    const data: LinkData[] = [
        {
            title: "GitHub",
            src: "https://github.com/tushinski",
        },
        {
            title: "Linkedin",
            src: "http://www.linkedin.com/in/2shinski",
        }
    ];

    function link(data: LinkData) {
        return (
            <p key={data.src}>
                <a href={data.src}>{data.title}</a>
            </p>
        )
    }

    return (
        <>
            {data.map(linkData => link(linkData))}
        </>
    );
}