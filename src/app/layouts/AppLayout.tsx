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
                <div className="container topbarInner">
                    <div className="brand">Workout Tracker</div>

                    <nav className="nav">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
                            Home
                        </NavLink>

                        {!isAuthed && (
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

                    <div style={{ flex: 1 }} />

                    <div className="topbarRight">
                        {isAuthed && (
                            <>
                                <span className="mutedText">{user?.email}</span>
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