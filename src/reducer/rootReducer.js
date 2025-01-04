import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./userReducer";

//여러 reducer들을 합치는 역할
const rootReducer = combineReducers({
  user: userSlice.reducer,
});
export default rootReducer;
