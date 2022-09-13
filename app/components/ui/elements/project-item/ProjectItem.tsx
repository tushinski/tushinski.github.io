import React from "react";
import s from "./ProjectItem.m.scss";
import {Link} from "react-router-dom";

type Props = {
    title: string,
    path?: string,
    url?: string,
    description: string,
    linkIcon: React.ReactNode,
    style?: React.CSSProperties,
};

type State = {
};

export const ProjectItem: React.FC<Props> = (props) => {

    function link() {
        if (props.url) {
            return (
                <a
                    className={s.itemButton}
                    href={props.url}
                    target="_blank"
                >
                    {props.linkIcon}
                </a>
            )
        }

        if (props.path) {
            return (
                <Link
                    to={props.path}
                    className={s.itemButton}
                >
                    {props.linkIcon}
                </Link>
            )
        }
    }

    return (
        <div
            className={s.item}
            style={props.style}
        >
            <div className={s.itemHeader}>
                <div className={s.itemTitle}>
                    {props.title}
                </div>
                {link()}
            </div>
            <div className={s.itemDescription}>
                {props.description}
            </div>
        </div>
    )
}