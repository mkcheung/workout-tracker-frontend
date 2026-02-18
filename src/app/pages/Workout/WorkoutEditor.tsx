import {
    useEffect,
    useState
} from "react";
import client from "../../../api/client";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { uiActions } from "../../../features/ui/uiSlice";
import { workoutActions } from "../../../features/workout/workoutSlice";
const WorkoutEditor = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // const [exercises, setExercises] =

    useEffect(async () => {
        console.log('load exercises')
        const res: { data: any; status: number } = await client.request({
            method: "GET",
            url: "api/exercises/",
        })
        console.log(res)
        if (res.status === 200) {
            console.log('access exercises')
            console.log(res.data)
        }
    })

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