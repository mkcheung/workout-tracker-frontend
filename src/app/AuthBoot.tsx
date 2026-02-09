import { useEffect } from "react";
import {
    useAppDispatch,
    useAppSelector
} from "./hooks";
import { authActions } from "../features/auth/slice";
import type { RootState } from "./store";

export function AuthBoot({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const status = useAppSelector((s: RootState) => s.auth.status);
    useEffect(() => {
        dispatch(authActions.rehydrate());
    }, [dispatch]);
    if (status === "loading") {
        return <div style={{ padding: 24 }}>Loading...</div>;
    }

    return <>{children}</>;
}