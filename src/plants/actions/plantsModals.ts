import {
    PLANTS_SET_MODALS_HIDE, 
    PLANTS_SET_ADD_SHOW, 
    PLANTS_SET_DELETE_SHOW, 
    PLANTS_SET_EDIT_SHOW, 
    PLANTS_SET_PROFILE_SHOW,
    PLANTS_SET_AMOUNT_SHOW,
    PLANTS_SHOW_ADD_CATEGORY,
} from "./types";

export const hidePlantModals = () => ({
    type: PLANTS_SET_MODALS_HIDE,
});

export const showPlantDelete = (id:number) => ({
    type: PLANTS_SET_DELETE_SHOW,
    payload: { isDeleteShow: {status: true, plantId: id} },
});

export const showPlantEdit = (id:number) => ({
    type: PLANTS_SET_EDIT_SHOW,
    payload: { isEditShow: {status: true, plantId: id} },
});

export const showPlantAdd = () => ({
    type: PLANTS_SET_ADD_SHOW,
    payload: { isAddShow: true },
});

export const showPlantProfile = (id:number) => ({
    type: PLANTS_SET_PROFILE_SHOW,
    payload: { isProfileShow: {status: true, plantId: id} },
});

export const showInTankAmount = (id:number) => ({
    type: PLANTS_SET_AMOUNT_SHOW,
    payload: { isInTankAmountShow:{status: true, plantId: id} },
});

export const showAddCategoryWindow = () => ({
    type: PLANTS_SHOW_ADD_CATEGORY,
    payload: {status: true},
});

export const hideAddCategoryWindow = () => ({
    type: PLANTS_SHOW_ADD_CATEGORY,
    payload: {status: false},
});
