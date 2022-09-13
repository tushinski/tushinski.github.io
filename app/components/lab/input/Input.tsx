import React, {SyntheticEvent} from "react";
import s from "./Input.m.scss";
import classNames from "classnames";

type Props = {
    value: string,
    label: string,
    onInput: (e: SyntheticEvent) => void,
    disabled?: boolean,
    error?: string,
};

type State = {
};

export const Input: React.FC<Props> = (props) => {
    const classnames = classNames(
        s.inputContainer,
        props.error && s.error,
    )

    return (
        <div className={classnames}>
            <label>{props.label}</label>
            <input
                placeholder="no value"
                disabled={!!props.disabled}
                value={props.value}
                onInput={props.onInput}
            />
            <div className={s.errorMsg}>{props.error}</div>
        </div>
    )
}