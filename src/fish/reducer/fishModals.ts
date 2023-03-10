import {
    FISHES_SET_MODALS_HIDE, 
    FISHES_SET_ADD_SHOW, 
    FISHES_SET_DELETE_SHOW, 
    FISHES_SET_EDIT_SHOW, 
    FISHES_SET_PROFILE_SHOW, 
    FISHES_SET_AMOUNT_SHOW
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
        case FISHES_SET_MODALS_HIDE:
            // console.log("FISHES_SET_MODALS_HIDE", {...initialState, payload});
            return initialState;

        case FISHES_SET_ADD_SHOW:
            // console.log("FISHES_SET_ADD_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case FISHES_SET_DELETE_SHOW:
            // console.log("FISHES_SET_DELETE_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case FISHES_SET_EDIT_SHOW:
            // console.log("FISHES_SET_EDIT_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case FISHES_SET_PROFILE_SHOW:
            // console.log("FISHES_SET_PROFILE_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case FISHES_SET_AMOUNT_SHOW:
            // console.log("FISHES_SET_AMOUNT_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        default:
            return state;
    }
}


export default fishesReducer;
