import React, {useState} from "react";
import s from "./Header.m.scss";
import classNames from "classnames";
import {Link} from "react-router-dom";
import {mainRoutes} from "../../../ts/routing/mainRoutes";
import {ExtRouteObject} from "../../../ts/hooks/useObservableRoutes";
import {RouteData} from "../../../ts/types/entities/RouteData";

type Props = {
    title: string,
    route?: ExtRouteObject<RouteData>,
    subroute?: ExtRouteObject<RouteData>
};

type State = {
    expanded: boolean,
};

const displayedRoutes = [
    mainRoutes.home,
    mainRoutes.lab,
    // mainRoutes.projects,
    mainRoutes.resume,
];

export const Header: React.FC<Props> = (props) => {
    const [state, setState] = useState<State>({
        expanded: false,
    });

    function navItems() {
        return displayedRoutes
            .map((routeMeta) => {
                const isActiveItem = routeMeta.title === props.route?.title;
                const className = classNames([
                    s.navItem,
                    isActiveItem && s.activeNavItem,
                ]);

                return (
                    <div className={className} key={routeMeta.path}>
                        <Link
                            to={routeMeta.path}
                            onClick={onBurgerClick}
                        >
                            {routeMeta.title}
                        </Link>
                        {isActiveItem && props.subroute &&
                            <div className={s.navSubitem}>
                                {props.subroute.title}
                            </div>
                        }
                    </div>
                )
            });
    }

    function onBurgerClick() {
        setState((state) => ({
            ...state,
            expanded: !state.expanded
        }));
    }

    const headerClassName = classNames([
        s.header,
        state.expanded && s.active,
    ]);

    return (
        <div className={headerClassName}>
            <div className={s.burgerLine}>
                <div
                    className={s.title}
                    onClick={onBurgerClick}
                >
                    <div className={s.titleArrow}>
                        &gt;
                    </div>
                    <div className={s.titleText}>
                        {props.title}{props.subroute ? `: ${props.subroute.title}` : ""}
                    </div>
                </div>
            </div>
            <div className={s.nav}>
                {navItems()}
            </div>
        </div>
    )
}