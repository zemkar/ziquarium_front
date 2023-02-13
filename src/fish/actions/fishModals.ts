import {
    SET_FISH_MODALS_HIDE, 
    SET_FISH_ADD_SHOW, 
    SET_FISH_DELETE_SHOW, 
    SET_FISH_EDIT_SHOW, 
    SET_FISH_PROFILE_SHOW,
    SET_FISH_AMOUNT_SHOW
} from "./types";

export const hideFishModals = () => ({
    type: SET_FISH_MODALS_HIDE,
});

export const showFishDelete = (id:number) => ({
    type: SET_FISH_DELETE_SHOW,
    payload: { isDeleteShow: {status: true, fishId: id} },
});

export const showFishEdit = (id:number) => ({
    type: SET_FISH_EDIT_SHOW,
    payload: { isEditShow: {status: true, fishId: id} },
});

export const showFishAdd = () => ({
    type: SET_FISH_ADD_SHOW,
    payload: { isAddShow: true },
});

export const showFishProfile = (id:number) => ({
    type: SET_FISH_PROFILE_SHOW,
    payload: { isProfileShow: {status: true, fishId: id} },
});

export const showInTankAmount = (id:number) => ({
    type: SET_FISH_AMOUNT_SHOW,
    payload: { isInTankAmountShow:{status: true, fishId: id} },
});
