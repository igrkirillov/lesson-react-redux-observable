import {buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {Service, ServicesState} from "../../types";

const createSlice = buildCreateSlice()

const initialState = {
    services: [],
    loading: false,
    error: null
} as ServicesState;

export const servicesSlice = createSlice({
    name: "services",
    initialState,
    selectors: {
        servicesState: state => state
    },
    reducers: (create) => ({
        servicesRequest: create.reducer(state => {
            state.loading = true;
            state.error = null;
        }),
        servicesFulfilled: create.reducer((state, action: PayloadAction<Service[]>) => {
            state.loading = false;
            state.services = action.payload;
        }),
        servicesError: create.reducer((state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
    })
})

export const {servicesRequest, servicesFulfilled, servicesError} = servicesSlice.actions;
export const {servicesState} = servicesSlice.selectors;