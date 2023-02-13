import {
    CHANGE_FISH_AMOUNT, CLEAR_TANK
} from "./types";



export const changeFishAmount = (fishId:number, amount:number, value:number) => ({
    type: CHANGE_FISH_AMOUNT,
    payload: {id: fishId, amount: amount, value: value}
});

export const clearTank = () => (
    {type: CLEAR_TANK,}
)