import React from "react";
import {EducationData} from "../../../ts/types/entities/EducationData";

type Props = {
};

type State = {
};

export const Education: React.FC<Props> = (props) => {
    const data: EducationData[] = [
        {
            school: "Peter the Great St.Petersburg Polytechnic University",
            degree: "Incomplete Higher Education (1.5 years)",
            startDate: "Sep, 2019",
            endDate: "May, 2021",
            city: "Saint-Petersburg",
            faculty: "Higher School of Supercomputer Science and Technology",
            field: "Informatics and Computer Engineering",
        },
        {
            school: "ITMO University",
            degree: "Secondary vocational education",
            startDate: "Sep, 2013",
            endDate: "Jul, 2017",
            city: "Saint-Petersburg",
            faculty: "Faculty of secondary vocational education",
            field: "Information Technologies",
        },
    ];

    function educationEntry(data: EducationData) {
        const title = `${data.degree}, ${data.school}, ${data.city}`;
        const dates = `${data.startDate} - ${data.endDate}`;

        return (
            <>
                <h1>{title}</h1>
                <small>{dates}</small>
                <p>{data.faculty}</p>
                <p>Field: {data.field}</p>
            </>
        )
    }

    return data.map(entryData => educationEntry(entryData));
}