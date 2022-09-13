import React from "react";
import {createRoot} from "react-dom/client";
import "regenerator-runtime/runtime";
import "./scss/main.scss";
import {App} from "./components/App";
import {BrowserRouter, HashRouter} from "react-router-dom";
import {store} from "./ts/store/store";
import {Provider} from "react-redux";

const appRoot = createRoot(document.getElementById("app-root"));

appRoot.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
);