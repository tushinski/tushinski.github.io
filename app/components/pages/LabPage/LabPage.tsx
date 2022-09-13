import React from "react";
import s from "./LabPage.m.scss";
import {labRoutes} from "../../../ts/routing/labRoutes";
import {MCSPanel} from "../../lab/panels/mcs-panel/MCSPanel";
import {LabLayout} from "../../lab/lab-layout/LabLayout";
import {LabNav} from "../../lab/lab-nav/LabNav";
import {ExtRouteObject, useObservableRoutes} from "../../../ts/hooks/useObservableRoutes";
import {RouteData} from "../../../ts/types/entities/RouteData";
import {setSubroute} from "../../../ts/store/store";
import {useDispatch} from "react-redux";

type Props = {
};

type State = {
};

export const LabPage: React.FC<Props> = (props) => {
    const dispatch = useDispatch();

    function onRoute(route: ExtRouteObject<RouteData>) {
        const serializableRoute = {
            ...route,
            element: undefined,
        };

        dispatch(setSubroute(serializableRoute));
    }

    function onRouteLeft(route: ExtRouteObject<RouteData>) {
        dispatch(setSubroute(undefined));
    }

    const routeTarget = useObservableRoutes<RouteData>({
        routes: [
            {
                path: labRoutes.mcs.path,
                title: labRoutes.mcs.title,
                element: (
                    <LabLayout title={labRoutes.mcs.title} panelComponent={MCSPanel}/>
                )
            }
        ],
        onRoute,
        onRouteLeft,
    });

    if (routeTarget) {
        return routeTarget;
    }

    return (
        <div className={s.page}>
            <LabNav/>
        </div>
    )
}