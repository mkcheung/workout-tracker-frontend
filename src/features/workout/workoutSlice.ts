import {
    createSlice
} from '@reduxjs/toolkit'

import type {
    PayloadAction
} from '@reduxjs/toolkit'
import client from "../../api/client";
import { call, put, takeLatest } from "redux-saga/effects";


type WorkoutState = {
    notes: string | null;
    performed_at: string | null;
    lastCreatedId: number | null;
    status: string
}

const initialState: WorkoutState = {
    notes: null,
    performed_at: null,
    status: 'idle',
    lastCreatedId: null
}


export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        createWorkout(state, action: PayloadAction<{ notes: string, performed_at: string }>) { },
        createWorkoutSucceeded(state, action: PayloadAction<{ id: number }>) {
            console.log('createWorkoutSucceeded')
            state.lastCreatedId = action.payload.id
            state.status = 'completed'
        }
    }
})
export const workoutActions = workoutSlice.actions
export default workoutSlice.reducer