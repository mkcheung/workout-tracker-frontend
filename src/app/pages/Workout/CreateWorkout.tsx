import {
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { uiActions } from "../../../features/ui/uiSlice";
import { workoutActions } from "../../../features/workout/workoutSlice";
const CreateWorkout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        notes: '',
        performed_at: ''
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            console.log('dispatched handleSubmit')
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
        <div>
            <div className="pageHeader">
                <h1 className="h1">Create Workout</h1>
            </div>

            <div className="card">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="field">
                        <div className="label">Notes</div>
                        <input
                            className="input"
                            name="notes"
                            onChange={handleChange}
                            value={formData.notes}
                            placeholder="Workout Notes"
                            autoFocus
                        />
                    </div>

                    <div>
                        Performed On:
                        <input
                            type="datetime-local"
                            name='performed_at'
                            value={formData.performed_at}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                        <button className="btn btnPrimary" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateWorkout