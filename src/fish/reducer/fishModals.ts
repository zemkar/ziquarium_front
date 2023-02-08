import {
    SET_FISH_MODALS_HIDE, SET_FISH_ADD_SHOW, SET_FISH_DELETE_SHOW, SET_FISH_EDIT_SHOW, SET_FISH_PROFILE_SHOW, SET_FISH_AMOUNT_SHOW
} from "../actions/types";


const initialState = { isDeleteShow: false, isEditShow: false, isAddShow: false, isProfileShow: false, isInTankAmountShow:false };


const fishesReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;

    switch (type) {
        case SET_FISH_MODALS_HIDE:
            return initialState;

        case SET_FISH_ADD_SHOW:
            return payload;

        case SET_FISH_DELETE_SHOW:
            return payload;

        case SET_FISH_EDIT_SHOW:
            return payload;

        case SET_FISH_PROFILE_SHOW:
            return payload;

        case SET_FISH_AMOUNT_SHOW:
            return payload;

        default:
            return state;
    }
}


export default fishesReducer;
