import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
    const isAuthed = status === "authenticated";

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
                </div>
            </header>

            <main className="container main">
                <Outlet />
            </main>
        </div>
    );
}