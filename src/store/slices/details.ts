import {buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {DetailInfo, DetailsState} from "../../types";

const createSlice = buildCreateSlice()

const initialState = {
    detailInfo: {},
    loading: false,
    error: null
} as DetailsState;

export const detailsSlice = createSlice({
    name: "details",
    initialState,
    selectors: {
        servicesState: state => state
    },
    reducers: (create) => ({
        detailsRequest: create.reducer(state => {
            state.loading = true;
            state.error = null;
        }),
        detailsFulfilled: create.reducer((state, action: PayloadAction<DetailInfo>) => {
            state.loading = false;
            state.detailInfo = action.payload;
        }),
        detailsError: create.reducer((state, action: PayloadAction<Error>) => {
            state.loading = false;
            state.error = action.payload;
        })
    })
})

export const {detailsRequest, detailsFulfilled, detailsError} = detailsSlice.actions;
export const {servicesState} = detailsSlice.selectors;