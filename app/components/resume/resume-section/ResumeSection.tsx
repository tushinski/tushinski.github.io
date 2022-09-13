import React, {PropsWithChildren} from "react";
import s from "./ResumeSection.m.scss";

type Props = PropsWithChildren<{
    icon: React.ReactNode,
    title: string,
}>;

type State = {
};

export const ResumeSection: React.FC<Props> = (props) => {
    return (
        <div className={s.section}>
            <div className={s.header}>
                <div className={s.headerIcon}>{props.icon}</div>
                <div className={s.headerText}>{props.title}</div>
            </div>
            <div className={s.content}>
                {props.children}
            </div>
        </div>
    )
}