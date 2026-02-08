import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import uiReducer from "../features/ui/uiSlice";
// later: workoutsReducer, exercisesReducer, insightsReducer, etc.

export default combineReducers({
    auth: authReducer,
    ui: uiReducer
});
