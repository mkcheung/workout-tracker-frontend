import {
    createSlice
} from '@reduxjs/toolkit'

import type {
    PayloadAction
} from '@reduxjs/toolkit'
import client from "../../api/client";
import { call, put, takeLatest } from "redux-saga/effects";

type Workout = {
    id: number;
    notes: string;
    performed_at: Date;
    created_at: Date;
    updated_at: Date;
    workout_exercises: WorkoutExercise[]
}

type WorkoutExercise = {
    id: number;
    exercise: number;
    order: number;
    workout_sets: WorkoutSet[];
}

type WorkoutSet = {
    id: number;
    set_number: number;
    reps: number;
    weight: string;
}


type WorkoutState = {
    workouts: Workout[],
    lastCreatedId: number | null,
    status: string
}
const initialState: WorkoutState = {
    workouts: [],
    lastCreatedId: null,
    status: 'idle'
}

export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        addWorkoutExercisesAndSets(state, action: PayloadAction<{ workout_exercises: [], workout_id_num: number }>) { },
        createWorkout(state, action: PayloadAction<{ notes: string, performed_at: string }>) { },
        createWorkoutSucceeded(state, action: PayloadAction<{ id: number }>) {
            state.lastCreatedId = action.payload.id
        },
        loadWorkouts: (state) => { },
        workoutsLoaded: (state, action: PayloadAction<{ workouts: Workout[] }>) => {
            state.workouts = action.payload.workouts
        }
    }
})
export const workoutActions = workoutSlice.actions
export default workoutSlice.reducer