import React from "react";

type Props = {
};

type State = {
};

export const Skills: React.FC<Props> = (props) => {
    const data = {
        "General": [
            "HTML/CSS",
            "Sass",
            "JavaScript",
            "TypeScript",
            "React",
            "Redux",
            "React Router",
            "Jest",
            "NodeJS, ExpressJS",
        ],
        "Conceptual knowledge": [
            "REST",
            "SOLID",
            "Design Patterns",
            "Functional Programming",
            "KISS, DRY, YAGNI",
        ],
        "CI/CD & Environment": [
            "Git",
            "NPM",
            "PNPM",
            "Webpack",
            "Rush",
            "GitLab",
            "Webstorm",
            "Unix",
        ]
    };

    function skillList(title: string, skills: string[]) {
        return (
            <div key={title}>
                <h1>{title}</h1>
                {skills.map(skill => <li key={skill}>{skill}</li>)}
            </div>
        )
    }

    return (
        <>
            {Object.entries(data).map(([title, skills]) => skillList(title, skills))}
        </>
    )
}