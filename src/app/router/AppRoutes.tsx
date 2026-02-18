import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home/Home';
import Register from "../pages/Register/register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import WorkoutList from "../pages/Workout/WorkoutList";
import CreateWorkout from "../pages/Workout/CreateWorkout";
import WorkoutEditor from "../pages/Workout/WorkoutEditor";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="workoutlist" element={<WorkoutList />} />
                    <Route path="/workout/new" element={<CreateWorkout />} />
                    <Route path="/workout/:id" element={<WorkoutEditor />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}