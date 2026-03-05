import {
    createSlice
} from '@reduxjs/toolkit'

import type {
    PayloadAction
} from '@reduxjs/toolkit'

type ExerciseStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

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
    status: ExerciseStatus;
}

const initialState: ExerciseState = {
    exercises: [],
    status: 'idle'
}

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        loadExercises: (state, action: PayloadAction<{ exercises: Exercise[] }>) => {
            state.exercises = action.payload.exercises
        },
        loadSuccessful: (state) => {
            state.status = 'succeeded'
        },
        loadFailed: (state) => {
            state.status = 'failed'
        }
    }
})

export const exerciseActions = exerciseSlice.actions;
export default exerciseSlice.reducer;