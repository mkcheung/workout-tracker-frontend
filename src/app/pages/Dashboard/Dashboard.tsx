import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { workoutActions } from "../../../features/workout/workoutSlice";


const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(workoutActions.loadWorkouts());
    }, [dispatch]);

    const { workouts } = useAppSelector((s) => s.workout);

    return (
        <div>
            Dashboard

            <ul>
                {workouts?.map((element) => (
                    <li key={element.id}>
                        <NavLink to={`/workout/${element.id}`}>
                            Workout {element.id}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <nav className="nav">
                <NavLink to="/workoutlist" className="navLink">
                    Workout List
                </NavLink>
            </nav>
        </div>
    )
}
export default Dashboard