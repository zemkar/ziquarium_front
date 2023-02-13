import {
    ADD_FILTER, CLEAR_FILTER, REMOVE_FILTER
} from "../actions/types";


const initialState = {
    categoryFilter: 0,
};


const fishFilter = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;

    switch (type) {
        case CLEAR_FILTER:
            console.log("CLEAR_FILTER", {initialState, payload });
            return initialState;

        case ADD_FILTER:
            console.log("ADD_FILTER", { ...state, ...payload });
            return { ...state, ...payload };

        case REMOVE_FILTER:
            console.log("REMOVE_FILTER", { ...state, ...payload });
            return { ...state, ...payload };

        default:
            return state;
    }
}


export default fishFilter;
