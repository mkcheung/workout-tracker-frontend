import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { authActions } from "../../features/auth/slice";
import { useAppDispatch, useAppSelector } from "../hooks";
export default function AppLayout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const status = useAppSelector((s) => s.auth.status);
    const user = useAppSelector((s) => s.auth.user);
    const isAuthed = status === "authenticated";

    const logout = () => {
        dispatch(authActions.logoutRequested());
        navigate("/login", { replace: true });
    };
    return (
        <div className="app">
            <header className="topbar">
                <div className="container topbarInner" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                    <NavLink to={isAuthed ? "/dashboard" : "/login"} className="brand" style={{ textDecoration: "none" }}>
                        Workout Tracker
                    </NavLink>

                    <nav className="nav" style={{ display: "flex", gap: 24 }}>
                        {isAuthed ? (
                            <>
                                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
                                    Dashboard
                                </NavLink>

                                <NavLink to="/progress" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
                                    Progress
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
                                    Login
                                </NavLink>
                                <NavLink to="/register" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
                                    Register
                                </NavLink>
                            </>
                        )}
                    </nav>

                    <div className="topbarRight">
                        {isAuthed && (
                            <>
                                <span className="mutedText">
                                    {user?.first_name || user?.username}
                                </span>
                                <button className="btn btnGhost" onClick={logout}>
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </header>

            <main className="container main">
                <Outlet />
            </main>
        </div>
    );
}