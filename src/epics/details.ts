import {Epic, ofType} from "redux-observable";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import {DetailInfo} from "../types";
import {Action, PayloadAction} from "@reduxjs/toolkit";
import {detailsError, detailsFulfilled, detailsRequest} from "../store/slices/details";

export type DetailsRequestAction =  PayloadAction<string> | PayloadAction<DetailInfo> | Action

export const detailsRequestEpic = (action$: Observable<DetailsRequestAction>) => action$.pipe(
    ofType(detailsRequest.type),
    switchMap<PayloadAction<string>, Observable<DetailsRequestAction>>((action: PayloadAction<string>) => {
        return ajax.getJSON(import.meta.env.VITE_SERVER_URL + "/api/services/" + action.payload).pipe(
            map(r => detailsFulfilled(r as DetailInfo)),
            catchError(err => of(detailsError((err as Error).message)))
        )
    })
);

export default detailsRequestEpic as Epic<DetailsRequestAction, DetailsRequestAction>;