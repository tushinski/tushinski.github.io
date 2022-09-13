import React from "react";
import {EmploymentHistoryEntry} from "../../../ts/types/entities/EmploymentHistoryEntry";

type Props = {
};

type State = {
};

export const EmploymentHistory: React.FC<Props> = (props) => {
    const data: EmploymentHistoryEntry[] = [
        {
            position: "Frontend Developer",
            employer: "VK",
            city: "Saint-Petersburg",
            startDate: "Nov 2021",
            endDate: "Present",
            projectsDescription: "four SPAs (monorepo)",
            responsibilities: [
                "monorepo maintaining",
                "development of shared monorepo libraries",
                "development of new features (for different projects)",
                "unit-testing",
                "code refactoring",
                "code review",
                "participation in sprint plannings",
            ],
            stack: [
                "TypeScript",
                "Sass",
                "CSS modules",
                "React",
                "Redux",
                "Rush",
                "Jest"
            ]
        },
        {
            position: "Middle Frontend Developer",
            employer: "NOVARDIS Consulting",
            city: "Saint-Petersburg",
            startDate: "Dec, 2019",
            endDate: "Nov, 2021",
            projectsDescription: "two large e-commerce websites on SAP CMS.",
            responsibilities: [
                "development of new features",
                "code review",
                "code refactoring",
                "tasks decomposition",
            ],
            stack: [
                "TypeScript",
                "Sass",
                "React",
                "JSP",
                "Java"
            ]
        },
        {
            position: "Junior Frontend Developer",
            employer: "\"MAKEIT\" Digital Agency",
            city: "Saint-Petersburg",
            startDate: "Feb, 2019",
            endDate: "Dec, 2019",
            projectsDescription: "two small SPAs, several landing pages and CMS-based websites.",
            responsibilities: [
                "close cooperation with the designer",
                "development of new projects from scratch",
            ],
            stack: [
                "JQuery",
                "Vue",
                "React",
                "Sass"
            ]
        },
    ];

    function employmentEntry(data: EmploymentHistoryEntry) {
        return (
            <>
                <h1>{data.position}<br/> at {data.employer}, {data.city}</h1>
                <p><small>{data.startDate} - {data.endDate}</small></p>
                <p>Projects: {data.projectsDescription}</p>
                <p>Stack: {data.stack.join(", ")}</p>
                <p>
                    Responsibilities:
                    <ul>
                        {data.responsibilities.map(resp => <li>{resp}</li>)}
                    </ul>
                </p>
            </>
        )
    }

    return data.map(entry => employmentEntry(entry));
}