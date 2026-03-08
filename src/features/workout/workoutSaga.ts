import { workoutActions } from "./workoutSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import client from "../../api/client";
import { uiActions } from "../ui/uiSlice";

function* addWorkoutExercisesAndSets(action: ReturnType<typeof workoutActions.addWorkoutExercisesAndSets>) {
    try {

        const res: { data: any; status: number } = yield call(() => client.request({
            method: "PUT",
            url: `/api/workouts/${action.payload.workout_id_num}/set-exercises/`,
            data: action.payload,
        }))
        if (res.status == 200) {
            yield put(uiActions.toastAdded({ kind: 'success', message: 'Exercises added to workout.' }));
        } else {
            yield put(uiActions.toastAdded({ kind: 'error', message: 'Error adding exercises to workout.' }));
        }

    } catch (err) {
        yield put(uiActions.toastAdded({ kind: 'error', message: 'Error adding exercises to workout.' }));
    }
}

function* createWorkoutWorker(action: ReturnType<typeof workoutActions.createWorkout>) {
    try {

        const res: { data: any; status: number } = yield call(() => client.request({
            method: "POST",
            url: "api/workouts/",
            data: action.payload,
        }))
        if (res.status == 201) {
            yield put(workoutActions.createWorkoutSucceeded({ id: res.data.id }))
            yield put(uiActions.toastAdded({ kind: 'success', message: 'Workout created.' }));
        } else {
            yield put(uiActions.toastAdded({ kind: 'error', message: 'Error creating workout.' }));
        }

    } catch (err) {
        yield put(uiActions.toastAdded({ kind: 'error', message: 'Error creating workout!' }));
    }
}

function* loadWorkoutsWorker(action: ReturnType<typeof workoutActions.loadWorkouts>) {
    try {

        const res: { data: any; status: number } = yield call(() => client.request({
            method: "GET",
            url: "api/workouts/",
        }))
        if (res.status == 200) {
            console.log(res.data)
            yield put(workoutActions.workoutsLoaded({ workouts: res.data }))
            yield put(uiActions.toastAdded({ kind: 'success', message: 'Workouts loaded.' }));
        } else {
            yield put(uiActions.toastAdded({ kind: 'error', message: 'Error loading workouts!' }));
        }

    } catch (err) {
        yield put(uiActions.toastAdded({ kind: 'error', message: 'Error loading workouts!' }));
    }
}

export function* workoutSaga() {
    yield takeLatest(workoutActions.addWorkoutExercisesAndSets.type, addWorkoutExercisesAndSets)
    yield takeLatest(workoutActions.createWorkout.type, createWorkoutWorker)
    yield takeLatest(workoutActions.loadWorkouts.type, loadWorkoutsWorker)
}
