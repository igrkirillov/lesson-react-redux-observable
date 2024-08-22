import {Epic, ofType} from "redux-observable";
import {servicesError, servicesFulfilled, servicesRequest} from "../store/slices/services";
import {catchError, map, Observable, switchMap, of} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import {Service} from "../types";
import {Action} from "@reduxjs/toolkit";


const servicesRequestEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(servicesRequest.type),
    switchMap<Action, Observable<Action>>(() => {
        return ajax.getJSON(import.meta.env.VITE_SERVER_URL + "/api/services").pipe(
            map(r => servicesFulfilled(r as Service[])),
            catchError(err => of(servicesError((err as Error).message)))
        )
    })
);

export default servicesRequestEpic as Epic<Action, Action>;