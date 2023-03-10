import {
    PLANTS_ADD_FILTER, PLANTS_CLEAR_FILTER, PLANTS_REMOVE_FILTER
} from "../actions/types";


const initialState = {
    categoryFilter: 0,
};


const plantsFilter = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;

    switch (type) {
        case PLANTS_CLEAR_FILTER:
            // console.log("PLANTS_CLEAR_FILTER", {initialState, payload });
            return initialState;

        case PLANTS_ADD_FILTER:
            // console.log("PLANTS_ADD_FILTER", { ...state, ...payload });
            return { ...state, ...payload };

        case PLANTS_REMOVE_FILTER:
            // console.log("PLANTS_REMOVE_FILTER", { ...state, ...payload });
            return { ...state, ...payload };

        default:
            return state;
    }
}


export default plantsFilter;
