import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {

    return (
        <div className="app">
            <header className="topbar">
                <div className="container topbarInner">
                    <div className="brand">OpsBoard</div>

                    <nav className="nav">
                        <NavLink to="/" className={({ isActive }) => (isActive ? "navLink active" : "navLink")}>
                            Home
                        </NavLink>
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