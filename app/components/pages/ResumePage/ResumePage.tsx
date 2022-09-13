import React from "react";
import styles from "./ResumePage.m.scss";
import {ResumeSection} from "../../resume/resume-section/ResumeSection";
import {Business, Language, Link, Person, School, SportsMartialArts} from "@mui/icons-material";
import {EmploymentHistory} from "../../resume/employment-history/EmploymentHistory";
import {Details} from "../../resume/details/Details";
import {Links} from "../../resume/links/Links";
import {Skills} from "../../resume/skills/Skills";
import {Languages} from "../../resume/languages/Languages";
import {Education} from "../../resume/education/Education";

type Props = {
};

type State = {
};

export const ResumePage: React.FC<Props> = (props) => {
    return (
        <div className={styles.home}>
            <ResumeSection
                icon={<Person/>}
                title="Details"
            >
                <Details/>
            </ResumeSection>
            <ResumeSection
                icon={<Business/>}
                title="Employment history"
            >
                <EmploymentHistory/>
            </ResumeSection>
            <ResumeSection
                icon={<SportsMartialArts/>}
                title={"Skills"}
            >
                <Skills/>
            </ResumeSection>
            <ResumeSection
                icon={<School/>}
                title="Education"
            >
                <Education/>
            </ResumeSection>
            <ResumeSection
                icon={<Language/>}
                title="Languages"
            >
                <Languages/>
            </ResumeSection>
            <ResumeSection
                icon={<Link/>}
                title="Links"
            >
                <Links/>
            </ResumeSection>
        </div>
    )
}