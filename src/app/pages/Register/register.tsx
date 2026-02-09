
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../shared/utils/helper";
import client from "../../../api/client";
import { useAppDispatch } from "../../hooks";
import { uiActions } from "../../../features/ui/uiSlice";
import { loginMessages } from "../../../features/ui/toastMessages";
import { setToken } from "../../../shared/auth/token";
export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirm: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailValid = validateEmail(formData.email)
        const pwMatch = formData.password !== "" && formData.password === formData.password_confirm;

        if (!emailValid) {
            dispatch(uiActions.toastAdded({ kind: "error", message: "Email format is invalid." }));
            return;
        }
        if (!pwMatch) {
            dispatch(uiActions.toastAdded({ kind: "error", message: "Passwords must match." }));
            return;
        }

        try {
            const res = await client.request({
                method: "POST",
                url: "api/auth/register/",
                data: formData,
            });
            if (res.status === 201) {
                setToken(res.data.token);
                dispatch(uiActions.toastAdded({ kind: "success", message: loginMessages.registered }));
                navigate("/login")
            } else {
                dispatch(uiActions.toastAdded({ kind: "error", message: "Registration failed." }));
            }
        } catch (e: any) {
            const message =
                e?.normalized?.message || e?.message || "Registration failed.";
            dispatch(uiActions.toastAdded({ kind: "error", message: `${message}` }));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((p) => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>
            <div className="pageHeader">
                <h1 className="h1">Create account</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <div className="label">First Name: </div>
                        <input className="input" name="first_name" value={formData.first_name} onChange={handleChange} />
                    </div>
                    <div className='field'>
                        <div className="label">Last Name: </div>
                        <input className="input" name='last_name' value={formData.last_name} onChange={handleChange} />
                    </div>
                    <div className='field'>
                        <div className="label">Username:</div>
                        <input className="input" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <div className="label">Email: </div>
                        <input className="input" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <div className="label">Password: </div>
                        <input className="input" name="password" type="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <div className="label">Confirm Password: </div>
                        <input className="input" name="password_confirm" type="password" value={formData.password_confirm} onChange={handleChange} />
                    </div>

                    <button className="btn btnPrimary" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Register;