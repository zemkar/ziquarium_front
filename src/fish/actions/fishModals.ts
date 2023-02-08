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
    payload: { isDeleteShow: false, isEditShow: false, isAddShow: false, isProfileShow: false, isInTankAmountShow:false },
});

export const showFishDelete = () => ({
    type: SET_FISH_DELETE_SHOW,
    payload: { isDeleteShow: true, isEditShow: false, isAddShow: false, isProfileShow: false, isInTankAmountShow:false },
});

export const showFishEdit = () => ({
    type: SET_FISH_EDIT_SHOW,
    payload: { isDeleteShow: false, isEditShow: true, isAddShow: false, isProfileShow: false, isInTankAmountShow:false },
});

export const showFishAdd = () => ({
    type: SET_FISH_ADD_SHOW,
    payload: { isDeleteShow: false, isEditShow: false, isAddShow: true, isProfileShow: false, isInTankAmountShow:false },
});

export const showFishProfile = () => ({
    type: SET_FISH_PROFILE_SHOW,
    payload: { isDeleteShow: false, isEditShow: false, isAddShow: false, isProfileShow: true, isInTankAmountShow:false },
});

export const showInTankAmount = () => ({
    type: SET_FISH_AMOUNT_SHOW,
    payload: { isDeleteShow: false, isEditShow: false, isAddShow: false, isProfileShow: true, isInTankAmountShow:false },
});
