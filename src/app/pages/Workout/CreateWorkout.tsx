import {
    useEffect,
    useState
} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { uiActions } from "../../../features/ui/uiSlice";
import { workoutActions } from "../../../features/workout/workoutSlice";
const CreateWorkout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        notes: '',
        performed_at: ''
    })

    const { status, lastCreatedId } = useAppSelector(s => s.workout);

    useEffect(() => {
        if (status == 'completed' && lastCreatedId) {
            navigate(`/workout/${lastCreatedId}`)
        }
    }, [lastCreatedId, status])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            dispatch(workoutActions.createWorkout(formData))
        } catch (e: any) {
            const message =
                e?.normalized?.message || e?.message || "Workout creation failed.";
            dispatch(uiActions.toastAdded({ kind: "error", message: `${message}` }));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="page">
            <div className="pageHeader">
                <h1 className="h1">New Workout</h1>
                <p className="pageSubtext">Set the date and any notes before adding exercises.</p>
            </div>

            <div className="card" style={{ maxWidth: 480 }}>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label" htmlFor="performed_at">Date & Time <span style={{ color: "red" }}>*</span></label>
                        <input
                            id="performed_at"
                            className="input"
                            type="datetime-local"
                            name="performed_at"
                            value={formData.performed_at}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="field">
                        <label className="label" htmlFor="notes">Notes <span style={{ opacity: 0.5, fontSize: 13 }}>(optional)</span></label>
                        <input
                            id="notes"
                            className="input"
                            name="notes"
                            onChange={handleChange}
                            value={formData.notes}
                            placeholder="e.g. Morning push session"
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 16 }}>
                        <button className="btn btnPrimary" type="submit">
                            Create &amp; Add Exercises
                        </button>
                        <NavLink to="/dashboard" className="navLink" style={{ fontSize: 14 }}>
                            Cancel
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateWorkout