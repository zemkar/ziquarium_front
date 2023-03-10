import {
    PLANTS_SET_MODALS_HIDE, PLANTS_SET_ADD_SHOW, PLANTS_SET_DELETE_SHOW, PLANTS_SET_EDIT_SHOW, PLANTS_SET_PROFILE_SHOW, PLANTS_SET_AMOUNT_SHOW
} from "../actions/types";


const initialState = { 
    isDeleteShow: {status: false, plantId: null}, 
    isEditShow: {status: false, plantId: null}, 
    isAddShow: false, 
    isProfileShow: {status: false, plantId: null}, 
    isInTankAmountShow:{status: false, plantId: null} 
};


const plantsReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;

    switch (type) {
        case PLANTS_SET_MODALS_HIDE:
            // console.log("PLANTS_SET_MODALS_HIDE", {...initialState, payload});
            return initialState;

        case PLANTS_SET_ADD_SHOW:
            // console.log("PLANTS_SET_ADD_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case PLANTS_SET_DELETE_SHOW:
            // console.log("PLANTS_SET_DELETE_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case PLANTS_SET_EDIT_SHOW:
            // console.log("PLANTS_SET_EDIT_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case PLANTS_SET_PROFILE_SHOW:
            // console.log("PLANTS_SET_PROFILE_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        case PLANTS_SET_AMOUNT_SHOW:
            // console.log("PLANTS_SET_AMOUNT_SHOW", {...initialState, payload});
            return {...initialState, ...payload};

        default:
            return state;
    }
}


export default plantsReducer;
