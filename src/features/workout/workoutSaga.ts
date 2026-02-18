import { workoutActions } from "./workoutSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import client from "../../api/client";
import { uiActions } from "../ui/uiSlice";

function* createWorkoutWorker(action: ReturnType<typeof workoutActions.createWorkout>) {
    try {

        const res: { data: any; status: number } = yield call(() => client.request({
            method: "POST",
            url: "api/workouts/",
            data: action.payload,
        }))

        if (res.status == 200) {
            yield put(uiActions.toastAdded({ kind: 'success', message: 'Workout created.' }));
        } else {
            yield put(uiActions.toastAdded({ kind: 'error', message: 'Error creating workout.' }));
        }

    } catch (err) {
        yield put(uiActions.toastAdded({ kind: 'error', message: 'Error creating workout!' }));
    }
}

export function* workoutSaga() {
    yield takeLatest(workoutActions.createWorkout.type, createWorkoutWorker);
}
