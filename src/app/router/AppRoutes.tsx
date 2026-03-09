import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import AppLayout from '../layouts/AppLayout';
import Register from "../pages/Register/register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login/Login";
import CreateWorkout from "../pages/Workout/CreateWorkout";
import WorkoutEditor from "../pages/Workout/WorkoutEditor";
import ProgressPage from "../pages/Progress/Progress";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="/workout/new" element={<CreateWorkout />} />
                    <Route path="/workout/:id" element={<WorkoutEditor />} />
                    <Route path="progress" element={<ProgressPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}