import {
  GET_FISHES, CLEAR_FISHES, FISH_REGISTER_SUCCESS, FISH_REGISTER_FAIL
} from "../actions/types";


const initialState = { fishes: null };


const fishesReducer = (state = initialState, action: { type: string, payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FISHES:
      return { fishes: payload };

    case CLEAR_FISHES:
      return { fishes: null };

    case FISH_REGISTER_SUCCESS:
      return { ...state, payload };

    case FISH_REGISTER_FAIL:
      return { ...state };

    default:
      return state;
  }
}


export default fishesReducer;
