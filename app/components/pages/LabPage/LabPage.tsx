import React from "react";
import s from "./LabPage.m.scss";
import {LabRoute, labRoutes} from "../../../ts/routing/labRoutes";
import {LabNav} from "../../lab/lab-nav/LabNav";
import {ExtRouteObject, Route, useObservableRoutes} from "../../../ts/hooks/useObservableRoutes";
import {RouteData} from "../../../ts/types/entities/RouteData";
import {setSubroute} from "../../../ts/store/store";
import {useDispatch} from "react-redux";
import {LabRoom} from "../../lab/lab-room/lab-room";

type Props = {
};

type State = {
};

export const LabPage: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const handleRoute = (route: ExtRouteObject<RouteData>) => {
        const serializableRoute = {
            ...route,
            element: undefined,
        };

        dispatch(setSubroute(serializableRoute));
    }
    const handleRouteLeft = (route: ExtRouteObject<RouteData>) => {
        dispatch(setSubroute(undefined));
    }
    const labRouteToRoute = (labRoute: LabRoute): Route<RouteData> => {
        return {
            path: labRoute.path,
            title: labRoute.title,
            element: (
                <LabRoom {...labRoute.roomProps}/>
            )
        }
    }
    const routes = Object.values(labRoutes).map(labRouteToRoute);
    const routeTarget = useObservableRoutes<RouteData>({
        routes,
        onRoute: handleRoute,
        onRouteLeft: handleRouteLeft,
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