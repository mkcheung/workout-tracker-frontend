
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import {
    useAppDispatch,
    useAppSelector
} from "../../hooks"
import { authActions } from '../../../features/auth/slice';

const Login = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector((s) => s.auth.status)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authActions.loginRequest(formData))
    }

    useEffect(() => {
        if (status === "authenticated") {
            navigate("/dashboard", { replace: true })
        }
    }, [status, navigate])
    const isSubmitting = status === "loading";

    return (
        <div className="container">
            <div className="authWrap">
                <div className="card authCard">
                    <div className="cardBody"></div>
                    <form className="form" onSubmit={handleForm}>
                        <div className="field">
                            <label className="label" htmlFor="username">
                                Username:
                            </label>
                            <input
                                className="input"
                                value={formData.username}
                                id="username"
                                name="username"
                                type="username"
                                autoComplete="username"
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="input"
                                value={formData.password}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button className="btn btnPrimary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </button>

                        {status === "error" ? (
                            <div className="taskError" style={{ marginTop: 6 }}>
                                Login failed. Please check your credentials.
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;