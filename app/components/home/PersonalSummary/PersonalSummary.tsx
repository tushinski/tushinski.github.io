import React from "react";
import s from "./PersonalSummary.m.scss";
import {AssignmentInd, BarChart, Business, LocationOn, Telegram} from "@mui/icons-material";

type Props = {
};

type State = {
};

export const PersonalSummary: React.FC<Props> = (props) => {
    return (
        <div className={s.summary}>
            <div className={s.summaryLine}>
                <div className={s.summaryLineIcon}>
                    <AssignmentInd/>
                </div>
                <span>Alex Tushinski</span>
            </div>
            <div className={s.summaryLine}>
                <div className={s.summaryLineIcon}>
                    <LocationOn/>
                </div>
                <span>Saint-Petersburg</span>
            </div>
            <div className={s.summaryLine}>
                <div className={s.summaryLineIcon}>
                    <BarChart/>
                </div>
                <span>4 years xp.</span>
            </div>
            <div className={s.summaryLine}>
                <div className={s.summaryLineIcon}>
                    <Business/>
                </div>
                <span>VK</span>
            </div>
            <div className={s.summaryLine}>
                <div className={s.summaryLineIcon}>
                    <Telegram/>
                </div>
                <span>@tushinski</span>
            </div>
        </div>
    )
}