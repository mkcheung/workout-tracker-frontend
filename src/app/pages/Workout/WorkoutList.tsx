
import { NavLink, useNavigate } from "react-router-dom";
const WorkoutList = () => {
    return (
        <div>
            <div className="pageHeader">
                <h1 className="h1">Workouts</h1>
            </div>

            <div className="card">
                <div className="cardBody">
                    <ul>
                    </ul>
                </div>
            </div>

            <nav className="nav">
                <NavLink to="/workout/new" className="navLink">
                    Create Workout
                </NavLink>
            </nav>

        </div>
    )
}

export default WorkoutList