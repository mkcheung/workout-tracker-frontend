import {
    Navigate,
    Outlet,
} from "react-router-dom";
import {
    useAppSelector
} from "../hooks";

const ProtectedRoute = () => {

    const status = useAppSelector((s) => s.auth.status);

    if (status === 'loading') {
        return <div>...Loading</div>
    }
    if (status === 'idle') {
        return <Navigate to="/login" replace />;
    }

    return <>
        <Outlet />
    </>;
}

export default ProtectedRoute;