import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import uiReducer from "../features/ui/uiSlice";
import workoutReducer from "../features/workout/workoutSlice";
// later: workoutsReducer, exercisesReducer, insightsReducer, etc.

export default combineReducers({
    auth: authReducer,
    ui: uiReducer,
    workout: workoutReducer
});
