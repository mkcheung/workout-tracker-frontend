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
        <div className="page">
            <div className="pageHeader">
                <h1 className="h1">Dashboard</h1>
                <p className="pageSubtext">Your recent workouts</p>
            </div>

            <section className="card">
                {workouts.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "48px 0", opacity: 0.5 }}>
                        <p>No workouts logged yet.</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {workouts.map((workout) => {
                            const d = new Date(workout.performed_at);
                            return (
                                <NavLink
                                    key={workout.id}
                                    to={`/workout/${workout.id}`}
                                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 8px", textDecoration: "none" }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 600 }}>
                                            {d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                                        </div>
                                        <div style={{ fontSize: 13, opacity: 0.6, marginTop: 2 }}>
                                            {d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                                        </div>
                                    </div>
                                    <span style={{ opacity: 0.4 }}>›</span>
                                </NavLink>
                            );
                        })}
                    </div>
                )}

                <div style={{ borderTop: "1px solid #eee", marginTop: 8, paddingTop: 12 }}>
                    <NavLink to="/workout/new" className="btn btnPrimary">
                        + New Workout
                    </NavLink>
                </div>
            </section>
        </div>
    )
}
export default Dashboard