import React from "react";
import { RouteObject } from "react-router";
import {RoutePoint} from "../../components/common/route-point/RoutePoint";
import {useRoutes} from "react-router";

export type Route<T> = ExtRouteObject<T>;
type RouteCallback<T> = (route: ExtRouteObject<T>) => void;
type ObservableRoutesOptions<RouteType> = {
    routes: Route<RouteType>[],
    onRoute?: RouteCallback<RouteType>,
    onRouteLeft?: RouteCallback<RouteType>,
}

export type ExtRouteObject<RouteType> = RouteObject & RouteType & {
    children?: ExtRouteObject<RouteType>[],
}

export function useObservableRoutes<RouteType>(options: ObservableRoutesOptions<RouteType>) {
    return useRoutes(
        observeRoutes(options.routes, options.onRoute, options.onRouteLeft)
    );
}

function observeRoutes<RouteType>(routes: Route<RouteType>[], onRoute?: RouteCallback<RouteType>, onRouteLeft?: RouteCallback<RouteType>,) {
    const observableRoutes: Route<RouteType>[] = [];

    for (let route of routes) {
        const observableRoute: Route<RouteType> = {
            ...route,
        };
        if (observableRoute.element) {
            observableRoute.element = (
                <RoutePoint
                    key={observableRoute.path}
                    onReached={onRoute}
                    onLeft={onRouteLeft}
                    route={observableRoute}
                >
                    {observableRoute.element}
                </RoutePoint>
            );
        }

        observableRoutes.push(observableRoute);

        if (observableRoute.children) {
            observeRoutes(observableRoute.children, onRoute, onRouteLeft);
        }
    }

    return observableRoutes;
}