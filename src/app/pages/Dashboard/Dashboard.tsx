import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";


const Dashboard = () => {
    const navigate = useNavigate()

    return (
        <div>
            Dashboard

            <nav className="nav">
                <NavLink to="/workoutlist" className="navLink">
                    Workout List
                </NavLink>
            </nav>
        </div>
    )
};

export default Dashboard;