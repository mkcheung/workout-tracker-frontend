import { call, put, takeLatest } from "redux-saga/effects";
import { authActions } from "./slice";
import client from "../../api/client";

function* loginWorker(action: ReturnType<typeof authActions.loginRequest>) {
    try {
        const { username, password } = action.payload;

        const res: { data: { token: string; user?: any } } = yield call(client.request, {
            method: "POST",
            url: "/api/auth/login/",
            data: { username: username, password },
        });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        yield put(authActions.loginStorage({ token, user }));
    } catch (e: any) {
        const message =
            e?.normalized?.message || e?.message || "Login failed. Please try again.";
        yield put(authActions.loginFailure({ message }));
    }
}

function* rehydrateWorker() {
    const token = localStorage.getItem("token");
    if (token) {
        yield put(authActions.loginStorage({ token }));
    } else {
        yield put(authActions.logout());
    }
}

function* logoutWorker() {
    localStorage.removeItem("token");
    // you can also clear other slices here later if needed
}

export function* authRootSaga() {
    yield takeLatest(authActions.loginRequest.type, loginWorker);
    yield takeLatest(authActions.rehydrate.type, rehydrateWorker);
    yield takeLatest(authActions.logout.type, logoutWorker);
}
