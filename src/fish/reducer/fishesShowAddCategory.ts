import { FISHES_SHOW_ADD_CATEGORY } from "../actions/types";


const initialState = { status: false};


const fishAddCategoryReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;

    switch (type) {
        case FISHES_SHOW_ADD_CATEGORY:
            console.log("FISHES_SHOW_ADD_CATEGORY", payload);
            return payload;

        default:
            return state;
    }
}


export default fishAddCategoryReducer;
