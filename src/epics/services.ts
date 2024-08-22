import {Epic, ofType} from "redux-observable";
import {servicesFulfilled, servicesRequest} from "../store/slices/services";
import {map, Observable, switchMap} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import {Service} from "../types";
import {Action} from "@reduxjs/toolkit";


const servicesRequestEpic = (action$: Observable<Action>) => action$.pipe(
    ofType(servicesRequest.type),
    switchMap<Action, Observable<Action>>(() => {
        return ajax.getJSON(import.meta.env.VITE_SERVER_URL + "/api/services").pipe(
            map(r => servicesFulfilled(r as Service[]))
        )
    })
);

export default servicesRequestEpic as Epic<Action, Action>;