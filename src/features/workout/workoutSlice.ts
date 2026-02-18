import {
    createSlice
} from '@reduxjs/toolkit'

import type {
    PayloadAction
} from '@reduxjs/toolkit'
import client from "../../api/client";
import { call, put, takeLatest } from "redux-saga/effects";


const initialState = {
    notes: null,
    performed_at: null,
}


export const workoutSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        createWorkout(state, action: PayloadAction<{ notes: string, performed_at: string }>) { },
    }
})
export const workoutActions = workoutSlice.actions
export default workoutSlice.reducer