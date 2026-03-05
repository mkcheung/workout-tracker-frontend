import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import uiReducer from "../features/ui/uiSlice";
import workoutReducer from "../features/workout/workoutSlice";
import exerciseReducer from "../features/exercise/exerciseSlice";
// later: workoutsReducer, exercisesReducer, insightsReducer, etc.

export default combineReducers({
    auth: authReducer,
    exercise: exerciseReducer,
    ui: uiReducer,
    workout: workoutReducer
});
