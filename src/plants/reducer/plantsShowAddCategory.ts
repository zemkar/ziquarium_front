import { PLANTS_SHOW_ADD_CATEGORY } from "../actions/types";


const initialState = { status: false};


const plantsAddCategoryReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;

    switch (type) {
        case PLANTS_SHOW_ADD_CATEGORY:
            console.log("PLANTS_SHOW_ADD_CATEGORY", payload);
            return payload;

        default:
            return state;
    }
}


export default plantsAddCategoryReducer;
