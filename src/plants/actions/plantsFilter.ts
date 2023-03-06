import {
    PLANTS_ADD_FILTER, PLANTS_CLEAR_FILTER
} from "../actions/types";


export const clearPlantsFilters = () => ({
    type: PLANTS_CLEAR_FILTER,
});

export const addPlantsFilter = (filter:any) => ({
    type: PLANTS_ADD_FILTER,
    payload: filter,
});


