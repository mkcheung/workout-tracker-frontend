import {
    useEffect,
    useState
} from "react"
import client from "../../../api/client"
import { exerciseActions } from "./../../../features/exercise/exerciseSlice"

import { useNavigate } from "react-router-dom"
import {
    useAppDispatch,
    useAppSelector
} from "../../hooks"
import { uiActions } from "../../../features/ui/uiSlice"
import { workoutActions } from "../../../features/workout/workoutSlice"
import { useParams } from "react-router-dom"

const WorkoutEditor = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const status = useAppSelector((s) => s.exercise.status)
    const exercises = useAppSelector((s) => s.exercise.exercises)
    const formSubmitable = false;

    const [query, getQuery] = useState("")
    const [selectedIds, setSelectedIds] = useState<number[]>([])
    const { id } = useParams<{ id: string }>();

    const filteredExercises = exercises.filter((exercise) => {
        return exercise.name.toLowerCase().includes(query.toLowerCase())
    })

    const addExercise = (id: number) => {
        setSelectedIds((prev) => (
            prev.includes(id) ? prev : [...prev, id]
        ))
    }

    const removeExercise = (id: number) => {
        setSelectedIds((prev) =>
            prev.filter((x) => x != id)
        )
    }

    const moveUp = (index: number) => {
        if (index === 0) return
        setSelectedIds((prev) => {
            const copy = [...prev]
            [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]]
            return copy
        })
    }

    const moveDown = (index: number) => {
        setSelectedIds((prev) => {
            if (index >= prev.length - 1) return prev
            const copy = [...prev]
            [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]]
            return copy
        })
    }

    useEffect(() => {
        if (status === 'idle') {
            dispatch(exerciseActions.loadExercises())
        }
    }, [status, dispatch])

    const selectedExercises = selectedIds.map((id) => {
        return exercises.find((exercise) => {
            return exercise.id === id
        })
    })

    return (
        <div>
            <div className="pageHeader">
                <h1 className="h1">Edit Workout</h1>
            </div>

            <div className="card" style={{ padding: 16 }}>
                {status === "loading" && <div>Loading exercises…</div>}
                {status === "failed" && <div>Couldn’t load exercises.</div>}
                {status === "succeeded" && (
                    <>
                        <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ flex: 1 }}>
                                <label>Find exercise</label>
                                <input
                                    value={query}
                                    onChange={(e) => getQuery(e.target.value)}
                                    placeholder="Search…"
                                />

                                <div style={{ marginTop: 8, border: "1px solid #ddd", maxHeight: 280, overflow: "auto" }}>
                                    {filteredExercises.map((exercise: any) => (
                                        <div
                                            key={exercise.id}
                                            style={{ display: "flex", justifyContent: "space-between", padding: 8 }}
                                        >
                                            <span>{exercise.name}</span>
                                            <button type="button" onClick={() => addExercise(exercise.id)}>
                                                Add
                                            </button>
                                        </div>
                                    ))}
                                    {filteredExercises.length === 0 && (
                                        <div style={{ padding: 8, opacity: 0.7 }}>No matches.</div>
                                    )}
                                </div>
                            </div>

                            <div style={{ flex: 1 }}>
                                <label>Selected ({selectedIds.length})</label>

                                <div style={{ marginTop: 8, border: "1px solid #ddd", minHeight: 280 }}>
                                    {selectedExercises.length === 0 ? (
                                        <div style={{ padding: 8, opacity: 0.7 }}>Nothing selected yet.</div>
                                    ) : (
                                        selectedExercises.map((exercise: any, idx: number) => (
                                            <div
                                                key={exercise.id}
                                                style={{ display: "flex", justifyContent: "space-between", padding: 8 }}
                                            >
                                                <span>
                                                    {idx + 1}. {exercise.name}
                                                </span>

                                                <div style={{ display: "flex", gap: 8 }}>
                                                    <button type="button" onClick={() => moveUp(idx)}>↑</button>
                                                    <button type="button" onClick={() => moveDown(idx)}>↓</button>
                                                    <button type="button" onClick={() => removeExercise(exercise.id)}>Remove</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                            <button type="button" onClick={() => setSelectedIds([])}>
                                Clear
                            </button>

                            <button
                                type="button"
                                disabled={!id ? true : false}
                                onClick={() => {
                                    const workoutIdNum = Number(id);

                                    dispatch(workoutActions.addExercisesToWorkout({
                                        exercise_ids: selectedIds,
                                        workout_id_num: workoutIdNum
                                    }));
                                }}
                            >
                                Save Workout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default WorkoutEditor