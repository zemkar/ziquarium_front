import {
    SET_FISH_MODALS_HIDE, SET_FISH_ADD_SHOW, SET_FISH_DELETE_SHOW, SET_FISH_EDIT_SHOW, SET_FISH_PROFILE_SHOW, SET_FISH_AMOUNT_SHOW
} from "../actions/types";


const initialState = { 
    isDeleteShow: {status: false, fishId: null}, 
    isEditShow: {status: false, fishId: null}, 
    isAddShow: false, 
    isProfileShow: {status: false, fishId: null}, 
    isInTankAmountShow:{status: false, fishId: null} 
};


const fishesReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;

    switch (type) {
        case SET_FISH_MODALS_HIDE:
            console.log("SET_FISH_MODALS_HIDE", {...initialState, payload});
            return initialState;

        case SET_FISH_ADD_SHOW:
            console.log("SET_FISH_ADD_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case SET_FISH_DELETE_SHOW:
            console.log("SET_FISH_DELETE_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case SET_FISH_EDIT_SHOW:
            console.log("SET_FISH_EDIT_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case SET_FISH_PROFILE_SHOW:
            console.log("SET_FISH_PROFILE_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case SET_FISH_AMOUNT_SHOW:
            console.log("SET_FISH_AMOUNT_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        default:
            return state;
    }
}


export default fishesReducer;
