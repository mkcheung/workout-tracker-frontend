import {
    createSlice
} from '@reduxjs/toolkit'

import type {
    PayloadAction
} from '@reduxjs/toolkit'

type Exercise = {
    id: number
    name: string
    category: string
    muscle_group: string
    is_active: boolean
    updated_at: Date
}

type ExerciseState = {
    exercises: Exercise[];
}

const initialState: ExerciseState = {
    exercises: []
}

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        loadExercises: (state, action: PayloadAction<{ exercises: Exercise[] }>) => {
            state.exercises = action.payload.exercises
        }
    }
})

export const exerciseActions = exerciseSlice.actions;
export default exerciseSlice.reducer;