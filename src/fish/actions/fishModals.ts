import {
    FISHES_SET_MODALS_HIDE, 
    FISHES_SET_ADD_SHOW, 
    FISHES_SET_DELETE_SHOW, 
    FISHES_SET_EDIT_SHOW, 
    FISHES_SET_PROFILE_SHOW,
    FISHES_SET_AMOUNT_SHOW,
    FISHES_SHOW_ADD_CATEGORY
} from "./types";

export const hideFishModals = () => ({
    type: FISHES_SET_MODALS_HIDE,
});

export const showFishDelete = (id:number) => ({
    type: FISHES_SET_DELETE_SHOW,
    payload: { isDeleteShow: {status: true, fishId: id} },
});

export const showFishEdit = (id:number) => ({
    type: FISHES_SET_EDIT_SHOW,
    payload: { isEditShow: {status: true, fishId: id} },
});

export const showFishAdd = () => ({
    type: FISHES_SET_ADD_SHOW,
    payload: { isAddShow: true },
});

export const showFishProfile = (id:number) => ({
    type: FISHES_SET_PROFILE_SHOW,
    payload: { isProfileShow: {status: true, fishId: id} },
});

export const showInTankAmount = (id:number) => ({
    type: FISHES_SET_AMOUNT_SHOW,
    payload: { isInTankAmountShow:{status: true, fishId: id} },
});


export const showAddCategoryWindow = () => ({
    type: FISHES_SHOW_ADD_CATEGORY,
    payload: {status: true},
});

export const hideAddCategoryWindow = () => ({
    type: FISHES_SHOW_ADD_CATEGORY,
    payload: {status: false},
});
