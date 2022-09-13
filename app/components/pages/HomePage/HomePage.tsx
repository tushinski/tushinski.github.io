import React from "react";
import s from "./HomePage.m.scss";
import {Logo} from "../../home/Logo/Logo";
import {PersonalSummary} from "../../home/PersonalSummary/PersonalSummary";

type Props = {
};

type State = {
};

export const HomePage: React.FC<Props> = (props) => {
    return (
        <>
            <div className={s.page}>
                <Logo/>
                <PersonalSummary/>
            </div>
        </>
    )
}