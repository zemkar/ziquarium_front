import {
    CHANGE_FISH_AMOUNT, REMOVE_FISH_FROM_TANK, REMOVE_ALL_FISH_FROM_TANK,
    CHANGE_PLANT_AMOUNT, REMOVE_PLANT_FROM_TANK, REMOVE_ALL_PLANTS_FROM_TANK,
    FILL_TANK, CLEAR_TANK,
} from "../actions/types";
import { itemInTank, tankFiller } from "../interfaces";


const initialState:tankFiller = { fishes: [], plants:[] };


const mainTankReducer = (state = initialState, action: { type: string, payload?: any }) => {
    const { type, payload } = action;
    var fishes: itemInTank[];
    var plants: itemInTank[];
    var itemIndex: number;
    // console.log("mainTankReducer called", state, action);
    

    switch (type) {
        case CHANGE_FISH_AMOUNT:
            fishes = state.fishes
            itemIndex = fishes.findIndex((e:any) => {return +e.id === +payload.id})
            if (itemIndex >= 0) fishes[itemIndex] = payload 
            else fishes.push(payload)
            localStorage.setItem('fishes', JSON.stringify(fishes))
            return {...state, fishes};

        case REMOVE_FISH_FROM_TANK:
            fishes = state.fishes
            fishes = fishes.filter((fish:any) => {return fish.id !== +payload.id})
            if (fishes.length > 0) localStorage.setItem('fishes', JSON.stringify(fishes))
            else localStorage.removeItem('fishes')
            return {...state, fishes};

        case REMOVE_ALL_FISH_FROM_TANK:
            // console.log("REMOVE_ALL_FISH_FROM_TANK", { ...initialState, plants: state.plants }); 
            localStorage.removeItem('fishes')
            return { ...initialState, plants: state.plants };   // return empty list of fishes and current list of plants


        case CHANGE_PLANT_AMOUNT:
            plants = state.plants
            itemIndex = plants.findIndex((e:any) => {return +e.id === +payload.id})
            if (itemIndex >= 0) plants[itemIndex] = payload 
            else plants.push(payload)
            localStorage.setItem('plants', JSON.stringify(plants))
            return {...state, plants};

        case REMOVE_PLANT_FROM_TANK:
            plants = state.plants
            plants = plants.filter((plant:any) => {return plant.id !== +payload.id})
            if (plants.length > 0) localStorage.setItem('plants', JSON.stringify(plants))
            else localStorage.removeItem('plants')
            return {...state, plants};

        case REMOVE_ALL_PLANTS_FROM_TANK:
            // console.log("REMOVE_ALL_PLANTS_FROM_TANK", { ...initialState, fishes: state.fishes }); 
            localStorage.removeItem('plants');
            return { ...initialState, fishes: state.fishes };   // return empty list of plants and current list of fishes

        case FILL_TANK:
            // console.log("Fill tank with:", payload);
            if (payload.fishes) fishes = payload.fishes
            else fishes = []
            if (payload.plants) plants = payload.plants
            else plants = []
            
            // console.log("Fill tank send to state:", {fishes, plants});
            return {fishes, plants};


        case CLEAR_TANK:
            localStorage.removeItem('fishes');
            localStorage.removeItem('plants');
            return initialState;

        default:
            return state;
    }
}


export default mainTankReducer;
