import React, {PropsWithChildren, useEffect} from "react";
import {RouteObject} from "react-router";

type Props<ExtRouteObject> = PropsWithChildren<{
    route: ExtRouteObject;
    onReached?: (route: ExtRouteObject) => void;
    onLeft?: (route: ExtRouteObject) => void;
}>;

type State = {
};

export function RoutePoint<ExtRouteObject extends RouteObject>(props: Props<ExtRouteObject>) {
    useEffect(() => {
        props.onReached && props.onReached(props.route);

        return () => {
            props.onLeft && props.onLeft(props.route);
        }
    }, []);

    return (
        <>
            {props.children}
        </>
    )
}