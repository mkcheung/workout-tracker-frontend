import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
// later: workoutsReducer, exercisesReducer, insightsReducer, etc.

export default combineReducers({
    auth: authReducer,
});
