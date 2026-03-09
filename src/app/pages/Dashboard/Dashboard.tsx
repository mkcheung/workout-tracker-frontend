import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { workoutActions } from "../../../features/workout/workoutSlice";


const Dashboard = () => {
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
                            Workout {new Date(element.performed_at).toLocaleString()}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <nav className="nav">
                <NavLink to="/workoutlist" className="navLink">
                    Workout List
                </NavLink>
            </nav>
            <nav className="nav">
                <NavLink to="/progress" className="navLink">
                    Progress Page
                </NavLink>
            </nav>
        </div>
    )
}
export default Dashboard