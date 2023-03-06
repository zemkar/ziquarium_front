import {
    FISHES_ADD_FILTER, FISHES_CLEAR_FILTER
} from "../actions/types";


export const clearFishFilters = () => ({
    type: FISHES_CLEAR_FILTER,
});

export const addFishFilter = (filter:any) => ({
    type: FISHES_ADD_FILTER,
    payload: filter,
});


