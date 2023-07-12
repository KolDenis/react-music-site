import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import trackReducer from './trackSlice';

const rootReducer = combineReducers({
    trackReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']