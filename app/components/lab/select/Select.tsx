import React, {useState} from "react";
import s from "./Select.m.scss";
import classNames from "classnames";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = {
    value: string,
    options: string[],
    label: string,
    onSelect: (value: string) => void,
    disabled?: boolean,
    error?: string,
};

type State = {
    isActive: boolean
};

export const Select: React.FC<Props> = (props) => {
    const [state, setState] = useState<State>({
        isActive: false,
    });

    const classnames = classNames(
        s.select,
        state.isActive && s.active,
        props.error && s.error,
    );

    const options = () => {
        return props.options.map(value => (
            <div key={value}
                className={classNames(s.option, value === props.value && s.selected)}
                onClick={() => props.onSelect(value)}
            >
                {value}
            </div>
        ));
    }

    const handleClick = () => {
        setState((prev) => ({
            isActive: !prev.isActive,
        }))
    }

    return (
        <div className={classnames} onClick={handleClick}>
            <label>{props.label}</label>
            <div className={s.value}>
                {props.value}
            </div>
            <ExpandMoreIcon className={s.arrow}/>
            <div className={s.options}>
                {options()}
            </div>
            <div className={s.errorMsg}>{props.error}</div>
        </div>
    )
}