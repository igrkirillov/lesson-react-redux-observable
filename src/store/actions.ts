import {createAction} from "@reduxjs/toolkit";
import {Item} from "../types";

export const searchRequest = createAction<string>("search-request");
export const searchFulfilled = createAction<Item[]>("search-fulfilled");
export const searchError = createAction<Error>("search-error");