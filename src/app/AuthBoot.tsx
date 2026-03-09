import { useEffect } from "react";
import {
    useAppDispatch,
    useAppSelector
} from "./hooks";
import { authActions } from "../features/auth/slice";
import { exerciseActions } from "../features/exercise/exerciseSlice";
import type { RootState } from "./store";

export function AuthBoot({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const status = useAppSelector((s: RootState) => s.auth.status);
    const exerciseStatus = useAppSelector((s: RootState) => s.exercise.status);

    useEffect(() => {
        dispatch(authActions.rehydrate());
    }, [dispatch]);

    useEffect(() => {
        if (status === "authenticated" && exerciseStatus === "idle") {
            dispatch(exerciseActions.loadExercises());
        }
    }, [status, exerciseStatus, dispatch]);
    if (status === "loading") {
        return <div style={{ padding: 24 }}>Loading...</div>;
    }

    return <>{children}</>;
}