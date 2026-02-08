import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import AppLayout from '../layouts/AppLayout';
import Home from '../pages/Home/Home';
import Register from "../pages/Register/register";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}