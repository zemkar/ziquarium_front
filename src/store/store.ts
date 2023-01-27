import { Action, createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import type { ThunkDispatch, ThunkAction } from "redux-thunk";
import rootReducer from "./reducer";
import { composeWithDevTools } from '@redux-devtools/extension';
// import { composeWithDevTools } from "redux-devtools-extension";


const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<RootState, void, Action>;