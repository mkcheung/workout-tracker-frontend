import type { RootState } from "../../app/store";

export const selectAuthToken = (s: RootState) => s.auth.token;
export const selectIsAuthed = (s: RootState) => Boolean(s.auth.token);
export const selectAuthStatus = (s: RootState) => s.auth.status;
export const selectAuthError = (s: RootState) => s.auth.error;