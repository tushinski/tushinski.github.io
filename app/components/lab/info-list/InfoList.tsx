import React from "react";
import s from "./InfoList.m.scss";

type Props = {
    title: string,
    items: { title: string, value: string }[]
};

type State = {
};

export const InfoList: React.FC<Props> = (props) => {
    function items() {
        return props.items.map(itemData => {
            return (
                <div className={s.item}>
                    <div className={s.itemTitle}>{itemData.title}:</div>
                    <div className={s.itemValue}>{itemData.value}</div>
                </div>
            )
        })
    }

    return (
        <div className={s.infoList}>
            <div className={s.title}>
                { props.title }
            </div>
            <div>
                { items() }
            </div>
        </div>
    )
}