
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../shared/utils/helper";
import client from "../../../api/client";

export const Register = () => {
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
        const validEmail = validateEmail(formData.email)
        const pwMatch = formData.password !== "" && formData.password === formData.password_confirm;

        try {
            const res = await client.request({
                method: "POST",
                url: "api/auth/register/",
                data: formData,
            });
        } catch (e: any) {
            const message =
                e?.normalized?.message || e?.message || "Registration failed.";
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