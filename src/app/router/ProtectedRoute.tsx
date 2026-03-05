import {
    Navigate,
    Outlet,
} from "react-router-dom";
import {
    useAppSelector
} from "../hooks";

const ProtectedRoute = () => {

    const status = useAppSelector((s) => s.auth.status);
    const token = useAppSelector((s) => s.auth.token);

    if (status === "idle" || status === "loading") {
        return <div>...Loading</div>;
    }
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>
        <Outlet />
    </>;
}

export default ProtectedRoute;