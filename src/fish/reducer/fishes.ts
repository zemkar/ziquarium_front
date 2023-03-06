import {
  FISHES_GET, FISHES_CLEAR, FISHES_REGISTER_SUCCESS, FISHES_REGISTER_FAIL
} from "../actions/types";


const initialState = { fishList: null };


const fishesReducer = (state = initialState, action: { type: string, payload?: any }) => {
  const { type, payload } = action;

  switch (type) {
    case FISHES_GET:
      return { fishList: payload };

    case FISHES_CLEAR:
      return { fishList: null };

    case FISHES_REGISTER_SUCCESS:
      return { ...state, payload };

    case FISHES_REGISTER_FAIL:
      return { ...state };

    default:
      return state;
  }
}


export default fishesReducer;
