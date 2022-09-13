import {createSlice, configureStore, SliceCaseReducers, PayloadAction} from '@reduxjs/toolkit'
import {ExtRouteObject} from "../hooks/useObservableRoutes"
import {RouteData} from "../types/entities/RouteData";

export type StoreState = {
    route: ExtRouteObject<RouteData> | undefined,
    subroute: ExtRouteObject<RouteData> | undefined,
}

const initialState: StoreState = {
    route: undefined,
    subroute: undefined,
};

const mainSlice = createSlice<StoreState, SliceCaseReducers<StoreState>>({
    name: 'main',
    initialState,
    reducers: {
        setMainRoute: (state, action: PayloadAction<ExtRouteObject<RouteData>>) => {
            state.route = action.payload;
        },
        setSubroute: (state, action: PayloadAction<ExtRouteObject<RouteData> | undefined>) => {
            state.subroute = action.payload;
        }
    }
});

export const {
    setMainRoute,
    setSubroute,
} = mainSlice.actions;

export const store = configureStore({
    reducer: mainSlice.reducer
});