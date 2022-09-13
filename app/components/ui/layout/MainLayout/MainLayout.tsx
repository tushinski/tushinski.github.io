import React, {PropsWithChildren} from "react";
import { BrowserRouter } from "react-router-dom";
import styles from "./MainLayout.m.scss";

type Props = PropsWithChildren<{
    header: JSX.Element
}>;

type State = {
};

export const MainLayout: React.FC<Props> = (props) => {
    return (
        <div className={styles.page}>
            {props.header}
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}