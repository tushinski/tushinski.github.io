import React, {useState} from "react";
import {Header} from "./common/header/Header";
import {HomePage} from "./pages/HomePage/HomePage";
import {ProjectsPage} from "./pages/ProjectsPage/ProjectsPage";
import {ResumePage} from "./pages/ResumePage/ResumePage";
import {MainLayout} from "./ui/layout/MainLayout/MainLayout";
import {ExtRouteObject, useObservableRoutes} from "../ts/hooks/useObservableRoutes";
import {RouteData} from "../ts/types/entities/RouteData";
import {LabPage} from "./pages/LabPage/LabPage";
import {mainRoutes} from "../ts/routing/mainRoutes";
import {docTitle} from "../ts/utils/docTitle";
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {setMainRoute, StoreState} from "../ts/store/store";

type Props = {
};

type State = {
};

export const App: React.FC<Props> = (props) => {
    const [mainRoute, subroute] = useSelector<StoreState, [ExtRouteObject<RouteData>, ExtRouteObject<RouteData>]>((state) => {
        return [state.route, state.subroute];
    });
    const dispatch = useDispatch();
    const title = mainRoute?.title;
    const headerTitle = title || "...";
    const documentTitle = title ? docTitle(title) : docTitle("...");

    function onRoute(route: ExtRouteObject<RouteData>) {
        dispatch(setMainRoute(route));
    }

    function wildcardTrailingPath(path: string) {
        return `${path}/*`;
    }

    function header() {
        return (
            <Header
                route={mainRoute}
                title={headerTitle}
                subroute={subroute}
            />
        )
    }

    const routeTarget = useObservableRoutes<RouteData>({
        routes: [
            {
                path: mainRoutes.home.path,
                title: mainRoutes.home.title,
                element: <HomePage/>,
            },
            {
                path: wildcardTrailingPath(mainRoutes.lab.path),
                title: mainRoutes.lab.title,
                element: <LabPage/>,
            },
            {
                path: wildcardTrailingPath(mainRoutes.projects.path),
                title: mainRoutes.projects.title,
                element: <ProjectsPage/>,
            },
            {
                path: wildcardTrailingPath(mainRoutes.resume.path),
                title: mainRoutes.resume.title,
                element: <ResumePage/>,
            },
        ],
        onRoute,
    });

    return (
        <>
            <Helmet>
                <title>{documentTitle}</title>
            </Helmet>
            <MainLayout
                header={header()}
            >
                {routeTarget}
            </MainLayout>
        </>
    )
}