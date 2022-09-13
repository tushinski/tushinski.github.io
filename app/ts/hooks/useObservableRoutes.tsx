import React from "react";
import { RouteObject } from "react-router";
import {RoutePoint} from "../../components/common/route-point/RoutePoint";
import {useRoutes} from "react-router";

type Routes<T> = ExtRouteObject<T>[];
type RouteCallback<T> = (route: ExtRouteObject<T>) => void;
type ObservableRoutesOptions<RouteType> = {
    routes: Routes<RouteType>,
    onRoute?: RouteCallback<RouteType>,
    onRouteLeft?: RouteCallback<RouteType>,
}

export type ExtRouteObject<RouteType> = RouteObject & RouteType & {
    children?: ExtRouteObject<RouteType>[],
}

export function useObservableRoutes<RouteType>(options: ObservableRoutesOptions<RouteType>) {
    observeRoutes(options.routes, options.onRoute, options.onRouteLeft);

    return useRoutes(options.routes);
}

function observeRoutes<RouteType>(routes: Routes<RouteType>, onRoute?: RouteCallback<RouteType>, onRouteLeft?: RouteCallback<RouteType>,) {
    for (let route of routes) {
        if (route.element) {
            route.element = (
                <RoutePoint
                    key={route.path}
                    onReached={onRoute}
                    onLeft={onRouteLeft}
                    route={route}
                >
                    {route.element}
                </RoutePoint>
            );
        }

        if (route.children) {
            observeRoutes(route.children, onRoute, onRouteLeft);
        }
    }
}