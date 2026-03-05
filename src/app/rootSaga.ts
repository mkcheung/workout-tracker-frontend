import { all, fork } from "redux-saga/effects";
import { authRootSaga } from "../features/auth/sagas";
import { workoutSaga } from "../features/workout/workoutSaga";
import { exerciseSaga } from "../features/exercise/exerciseSaga";

export default function* rootSaga() {
    yield all([
        fork(authRootSaga),
        fork(workoutSaga),
        fork(exerciseSaga),
    ]);
}