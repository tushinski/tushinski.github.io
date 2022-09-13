import React, {SyntheticEvent} from "react";
import s from "./Button.m.scss";

type Props = {
    title: string,
    onClick: (e: SyntheticEvent) => void,
    disabled?: boolean,
};

type State = {
};

export const Button: React.FC<Props> = (props) => {
    return (
        <button
            className={s.button}
            disabled={!!props.disabled}
            onClick={props.onClick}
        >
            { props.title }
        </button>
    )
}