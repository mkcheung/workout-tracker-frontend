import {
    useEffect,
    useState
} from "react";
import client from "../../../api/client";
import { exerciseActions } from "./../../../features/exercise/exerciseSlice";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { uiActions } from "../../../features/ui/uiSlice";
import { workoutActions } from "../../../features/workout/workoutSlice";
const WorkoutEditor = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getExercises = async () => {
            const res: { data: any; status: number } = await client.request({
                method: "GET",
                url: "api/exercises/",
            })
            if (res.status === 200) {
                dispatch(exerciseActions.loadExercises({ exercises: res.data }));
            }
        }
        getExercises()
    }, [])

    return (
        <div>
            <div className="pageHeader">
                <h1 className="h1">Edit Workout</h1>
            </div>

            <div className="card">
            </div>

        </div>
    )
}

export default WorkoutEditor