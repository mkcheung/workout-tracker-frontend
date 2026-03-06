import { exerciseActions } from "./exerciseSlice"
import { call, put, takeLatest } from "redux-saga/effects"
import client from "../../api/client"
import { uiActions } from "../ui/uiSlice"

function* loadExercises(action: ReturnType<typeof exerciseActions.loadExercises>) {
    try {
        const res: { data: any; status: number } = yield call(() => client.request({
            method: "GET",
            url: "api/exercises/",
        }))
        if (res.status == 200) {
            yield put(exerciseActions.loadSuccessful({ exercises: res.data }))
        } else {
            yield put(uiActions.toastAdded({ kind: 'error', message: `Error loading exercises.` }));
        }

    } catch (err) {
        yield put(uiActions.toastAdded({ kind: 'error', message: `Error loading exercises.` }));
    }
}

export function* exerciseSaga() {
    yield takeLatest(exerciseActions.loadExercises.type, loadExercises)
}