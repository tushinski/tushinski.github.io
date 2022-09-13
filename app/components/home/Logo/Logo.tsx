import React from "react";
import s from "./Logo.m.scss";

type Props = {
};

type State = {
};

export const Logo: React.FC<Props> = (props) => {
    return (
        <div className={s.logo}>
            {/*<div className={s.bg}></div>*/}
            <div className={s.line1}>
                Frontend
            </div>
            <div className={s.line2}>
                Developer
            </div>
        </div>
    )
}