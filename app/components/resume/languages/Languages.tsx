import React from "react";
import {LanguageData} from "../../../ts/types/entities/LanguageData";

type Props = {
};

type State = {
};

export const Languages: React.FC<Props> = (props) => {
    const data: LanguageData[] = [
        {
            name: "Russian",
            level: "Native"
        },
        {
            name: "English",
            level: "B2"
        }
    ];

    function language(data: LanguageData) {
        return (
            <p key={data.name}>{data.name}: {data.level}</p>
        )
    }

    return (
        <>
            {data.map(langData => language(langData))}
        </>
    )
}