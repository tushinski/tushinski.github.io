import React, {SyntheticEvent} from "react";
import s from "./Input.m.scss";
import classNames from "classnames";

type Props = {
    value: string,
    label: string,
    onInput: (newValue: string) => void,
    disabled?: boolean,
    error?: string,
};

type State = {
};

export const Input: React.FC<Props> = (props) => {
    const classnames = classNames(
        s.inputContainer,
        props.error && s.error,
    );

    const handleInput = (e: SyntheticEvent) => {
        props.onInput((e.target as HTMLInputElement).value)
    }

    return (
        <div className={classnames}>
            <label>{props.label}</label>
            <input
                placeholder="no value"
                disabled={!!props.disabled}
                value={props.value}
                onInput={handleInput}
            />
            <div className={s.errorMsg}>{props.error}</div>
        </div>
    )
}