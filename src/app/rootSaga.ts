import { all, fork } from "redux-saga/effects";
import { authRootSaga } from "../features/auth/sagas";

export default function* rootSaga() {
    yield all([
        fork(authRootSaga),
    ]);
}