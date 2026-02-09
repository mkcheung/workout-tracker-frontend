import {
    createSlice
} from '@reduxjs/toolkit'

import type {
    PayloadAction
} from '@reduxjs/toolkit'

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error'

type User = {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
}

type AuthState = {
    token: string | null;
    user: User | null;
    status: AuthStatus;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
    status: 'idle',
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (
            state,
            _action: PayloadAction<{ username: string; password: string }>
        ) => {
            state.status = 'loading'
            state.error = null
        },
        loginStorage: (state, action: PayloadAction<{ token: string; user?: User }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user ?? null;
            state.status = 'authenticated';
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<{ message: string }>) => {
            state.status = 'error'
            state.error = action.payload.message
        },
        rehydrate: (state) => {
            state.status = 'loading'
            state.error = null
        },
        logout: (state) => {
            state.token = null
            state.user = null
            state.status = 'idle'
            state.error = null
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;

