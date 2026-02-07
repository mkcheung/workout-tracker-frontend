
import { useState } from "react"
import { validateEmail } from "../../shared/utils/helper";

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validEmail = validateEmail(formData.email)
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
                <form>
                    <div className="field">
                        <div className="label">Name: </div>
                        <input className="input" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <div className="label">Email: </div>
                        <input className="input" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <div className="label">Password: </div>
                        <input className="input" type="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="field">
                        <div className="label">Confirm Password: </div>
                        <input className="input" type="passowrd" value={formData.password_confirm} onChange={handleChange} />
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