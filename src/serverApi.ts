import {Item} from "./types";

export const fetchItems = async (searchText: string): Promise<Item[]> => {
    const params = new URLSearchParams([["q", searchText]]);
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/search?" + params.toString())
        .then(async response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return (await response.json()) as Item[];
        })
}