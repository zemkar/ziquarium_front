import {
    ADD_FILTER, CLEAR_FILTER
} from "../actions/types";


export const clearFishFilters = () => ({
    type: CLEAR_FILTER,
});

export const addFishFilter = (filter:any) => ({
    type: ADD_FILTER,
    payload: filter,
});


