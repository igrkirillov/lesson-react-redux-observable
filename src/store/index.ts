import {Action, configureStore} from "@reduxjs/toolkit";
import {servicesSlice} from "./slices/services";
import {detailsSlice} from "./slices/details";
import {combineEpics, createEpicMiddleware} from "redux-observable"
import servicesRequestEpic from "../epics/services";

// create the saga middleware
const epicMiddleware = createEpicMiddleware<Action, Action>()
// mount it on the Store
export const store = configureStore({
    reducer: {
        services: servicesSlice.reducer,
        details: detailsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type RootState = ReturnType<AppStore['getState']>

// then run the epic
epicMiddleware.run(combineEpics(servicesRequestEpic));